package io.bookapp.web.rest;

import io.bookapp.BookApplicationApp;

import io.bookapp.domain.Styliste;
import io.bookapp.repository.StylisteRepository;
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

import io.bookapp.domain.enumeration.Experience;
/**
 * Test class for the StylisteResource REST controller.
 *
 * @see StylisteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BookApplicationApp.class)
public class StylisteResourceIntTest {

    private static final Experience DEFAULT_EXPERIENCE = Experience.DEBUTANT;
    private static final Experience UPDATED_EXPERIENCE = Experience.AMATEUR;

    @Autowired
    private StylisteRepository stylisteRepository;

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

    private MockMvc restStylisteMockMvc;

    private Styliste styliste;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StylisteResource stylisteResource = new StylisteResource(stylisteRepository);
        this.restStylisteMockMvc = MockMvcBuilders.standaloneSetup(stylisteResource)
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
    public static Styliste createEntity(EntityManager em) {
        Styliste styliste = new Styliste()
            .experience(DEFAULT_EXPERIENCE);
        return styliste;
    }

    @Before
    public void initTest() {
        styliste = createEntity(em);
    }

    @Test
    @Transactional
    public void createStyliste() throws Exception {
        int databaseSizeBeforeCreate = stylisteRepository.findAll().size();

        // Create the Styliste
        restStylisteMockMvc.perform(post("/api/stylistes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(styliste)))
            .andExpect(status().isCreated());

        // Validate the Styliste in the database
        List<Styliste> stylisteList = stylisteRepository.findAll();
        assertThat(stylisteList).hasSize(databaseSizeBeforeCreate + 1);
        Styliste testStyliste = stylisteList.get(stylisteList.size() - 1);
        assertThat(testStyliste.getExperience()).isEqualTo(DEFAULT_EXPERIENCE);
    }

    @Test
    @Transactional
    public void createStylisteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stylisteRepository.findAll().size();

        // Create the Styliste with an existing ID
        styliste.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStylisteMockMvc.perform(post("/api/stylistes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(styliste)))
            .andExpect(status().isBadRequest());

        // Validate the Styliste in the database
        List<Styliste> stylisteList = stylisteRepository.findAll();
        assertThat(stylisteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStylistes() throws Exception {
        // Initialize the database
        stylisteRepository.saveAndFlush(styliste);

        // Get all the stylisteList
        restStylisteMockMvc.perform(get("/api/stylistes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(styliste.getId().intValue())))
            .andExpect(jsonPath("$.[*].experience").value(hasItem(DEFAULT_EXPERIENCE.toString())));
    }
    
    @Test
    @Transactional
    public void getStyliste() throws Exception {
        // Initialize the database
        stylisteRepository.saveAndFlush(styliste);

        // Get the styliste
        restStylisteMockMvc.perform(get("/api/stylistes/{id}", styliste.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(styliste.getId().intValue()))
            .andExpect(jsonPath("$.experience").value(DEFAULT_EXPERIENCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStyliste() throws Exception {
        // Get the styliste
        restStylisteMockMvc.perform(get("/api/stylistes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStyliste() throws Exception {
        // Initialize the database
        stylisteRepository.saveAndFlush(styliste);

        int databaseSizeBeforeUpdate = stylisteRepository.findAll().size();

        // Update the styliste
        Styliste updatedStyliste = stylisteRepository.findById(styliste.getId()).get();
        // Disconnect from session so that the updates on updatedStyliste are not directly saved in db
        em.detach(updatedStyliste);
        updatedStyliste
            .experience(UPDATED_EXPERIENCE);

        restStylisteMockMvc.perform(put("/api/stylistes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStyliste)))
            .andExpect(status().isOk());

        // Validate the Styliste in the database
        List<Styliste> stylisteList = stylisteRepository.findAll();
        assertThat(stylisteList).hasSize(databaseSizeBeforeUpdate);
        Styliste testStyliste = stylisteList.get(stylisteList.size() - 1);
        assertThat(testStyliste.getExperience()).isEqualTo(UPDATED_EXPERIENCE);
    }

    @Test
    @Transactional
    public void updateNonExistingStyliste() throws Exception {
        int databaseSizeBeforeUpdate = stylisteRepository.findAll().size();

        // Create the Styliste

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStylisteMockMvc.perform(put("/api/stylistes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(styliste)))
            .andExpect(status().isBadRequest());

        // Validate the Styliste in the database
        List<Styliste> stylisteList = stylisteRepository.findAll();
        assertThat(stylisteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStyliste() throws Exception {
        // Initialize the database
        stylisteRepository.saveAndFlush(styliste);

        int databaseSizeBeforeDelete = stylisteRepository.findAll().size();

        // Delete the styliste
        restStylisteMockMvc.perform(delete("/api/stylistes/{id}", styliste.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Styliste> stylisteList = stylisteRepository.findAll();
        assertThat(stylisteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Styliste.class);
        Styliste styliste1 = new Styliste();
        styliste1.setId(1L);
        Styliste styliste2 = new Styliste();
        styliste2.setId(styliste1.getId());
        assertThat(styliste1).isEqualTo(styliste2);
        styliste2.setId(2L);
        assertThat(styliste1).isNotEqualTo(styliste2);
        styliste1.setId(null);
        assertThat(styliste1).isNotEqualTo(styliste2);
    }
}
