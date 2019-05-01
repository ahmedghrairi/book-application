package io.bookapp.web.rest;

import io.bookapp.BookApplicationApp;

import io.bookapp.domain.StylePhoto;
import io.bookapp.repository.StylePhotoRepository;
import io.bookapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static io.bookapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StylePhotoResource REST controller.
 *
 * @see StylePhotoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BookApplicationApp.class)
public class StylePhotoResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private StylePhotoRepository stylePhotoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restStylePhotoMockMvc;

    private StylePhoto stylePhoto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StylePhotoResource stylePhotoResource = new StylePhotoResource(stylePhotoRepository);
        this.restStylePhotoMockMvc = MockMvcBuilders.standaloneSetup(stylePhotoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StylePhoto createEntity(EntityManager em) {
        StylePhoto stylePhoto = new StylePhoto()
            .nom(DEFAULT_NOM);
        return stylePhoto;
    }

    @Before
    public void initTest() {
        stylePhoto = createEntity(em);
    }

    @Test
    @Transactional
    public void createStylePhoto() throws Exception {
        int databaseSizeBeforeCreate = stylePhotoRepository.findAll().size();

        // Create the StylePhoto
        restStylePhotoMockMvc.perform(post("/api/style-photos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stylePhoto)))
            .andExpect(status().isCreated());

        // Validate the StylePhoto in the database
        List<StylePhoto> stylePhotoList = stylePhotoRepository.findAll();
        assertThat(stylePhotoList).hasSize(databaseSizeBeforeCreate + 1);
        StylePhoto testStylePhoto = stylePhotoList.get(stylePhotoList.size() - 1);
        assertThat(testStylePhoto.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createStylePhotoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stylePhotoRepository.findAll().size();

        // Create the StylePhoto with an existing ID
        stylePhoto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStylePhotoMockMvc.perform(post("/api/style-photos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stylePhoto)))
            .andExpect(status().isBadRequest());

        // Validate the StylePhoto in the database
        List<StylePhoto> stylePhotoList = stylePhotoRepository.findAll();
        assertThat(stylePhotoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStylePhotos() throws Exception {
        // Initialize the database
        stylePhotoRepository.saveAndFlush(stylePhoto);

        // Get all the stylePhotoList
        restStylePhotoMockMvc.perform(get("/api/style-photos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stylePhoto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())));
    }
    
    @Test
    @Transactional
    public void getStylePhoto() throws Exception {
        // Initialize the database
        stylePhotoRepository.saveAndFlush(stylePhoto);

        // Get the stylePhoto
        restStylePhotoMockMvc.perform(get("/api/style-photos/{id}", stylePhoto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stylePhoto.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStylePhoto() throws Exception {
        // Get the stylePhoto
        restStylePhotoMockMvc.perform(get("/api/style-photos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStylePhoto() throws Exception {
        // Initialize the database
        stylePhotoRepository.saveAndFlush(stylePhoto);

        int databaseSizeBeforeUpdate = stylePhotoRepository.findAll().size();

        // Update the stylePhoto
        StylePhoto updatedStylePhoto = stylePhotoRepository.findById(stylePhoto.getId()).get();
        // Disconnect from session so that the updates on updatedStylePhoto are not directly saved in db
        em.detach(updatedStylePhoto);
        updatedStylePhoto
            .nom(UPDATED_NOM);

        restStylePhotoMockMvc.perform(put("/api/style-photos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStylePhoto)))
            .andExpect(status().isOk());

        // Validate the StylePhoto in the database
        List<StylePhoto> stylePhotoList = stylePhotoRepository.findAll();
        assertThat(stylePhotoList).hasSize(databaseSizeBeforeUpdate);
        StylePhoto testStylePhoto = stylePhotoList.get(stylePhotoList.size() - 1);
        assertThat(testStylePhoto.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingStylePhoto() throws Exception {
        int databaseSizeBeforeUpdate = stylePhotoRepository.findAll().size();

        // Create the StylePhoto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStylePhotoMockMvc.perform(put("/api/style-photos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stylePhoto)))
            .andExpect(status().isBadRequest());

        // Validate the StylePhoto in the database
        List<StylePhoto> stylePhotoList = stylePhotoRepository.findAll();
        assertThat(stylePhotoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStylePhoto() throws Exception {
        // Initialize the database
        stylePhotoRepository.saveAndFlush(stylePhoto);

        int databaseSizeBeforeDelete = stylePhotoRepository.findAll().size();

        // Delete the stylePhoto
        restStylePhotoMockMvc.perform(delete("/api/style-photos/{id}", stylePhoto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StylePhoto> stylePhotoList = stylePhotoRepository.findAll();
        assertThat(stylePhotoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StylePhoto.class);
        StylePhoto stylePhoto1 = new StylePhoto();
        stylePhoto1.setId(1L);
        StylePhoto stylePhoto2 = new StylePhoto();
        stylePhoto2.setId(stylePhoto1.getId());
        assertThat(stylePhoto1).isEqualTo(stylePhoto2);
        stylePhoto2.setId(2L);
        assertThat(stylePhoto1).isNotEqualTo(stylePhoto2);
        stylePhoto1.setId(null);
        assertThat(stylePhoto1).isNotEqualTo(stylePhoto2);
    }
}
