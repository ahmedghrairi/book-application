package io.bookapp.web.rest;

import io.bookapp.BookApplicationApp;

import io.bookapp.domain.Photographe;
import io.bookapp.repository.PhotographeRepository;
import io.bookapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static io.bookapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.bookapp.domain.enumeration.Experience;
/**
 * Test class for the PhotographeResource REST controller.
 *
 * @see PhotographeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BookApplicationApp.class)
public class PhotographeResourceIntTest {

    private static final Experience DEFAULT_EXPERIENCE = Experience.DEBUTANT;
    private static final Experience UPDATED_EXPERIENCE = Experience.AMATEUR;

    @Autowired
    private PhotographeRepository photographeRepository;

    @Mock
    private PhotographeRepository photographeRepositoryMock;

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

    private MockMvc restPhotographeMockMvc;

    private Photographe photographe;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PhotographeResource photographeResource = new PhotographeResource(photographeRepository);
        this.restPhotographeMockMvc = MockMvcBuilders.standaloneSetup(photographeResource)
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
    public static Photographe createEntity(EntityManager em) {
        Photographe photographe = new Photographe()
            .experience(DEFAULT_EXPERIENCE);
        return photographe;
    }

    @Before
    public void initTest() {
        photographe = createEntity(em);
    }

    @Test
    @Transactional
    public void createPhotographe() throws Exception {
        int databaseSizeBeforeCreate = photographeRepository.findAll().size();

        // Create the Photographe
        restPhotographeMockMvc.perform(post("/api/photographes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(photographe)))
            .andExpect(status().isCreated());

        // Validate the Photographe in the database
        List<Photographe> photographeList = photographeRepository.findAll();
        assertThat(photographeList).hasSize(databaseSizeBeforeCreate + 1);
        Photographe testPhotographe = photographeList.get(photographeList.size() - 1);
        assertThat(testPhotographe.getExperience()).isEqualTo(DEFAULT_EXPERIENCE);
    }

    @Test
    @Transactional
    public void createPhotographeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = photographeRepository.findAll().size();

        // Create the Photographe with an existing ID
        photographe.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPhotographeMockMvc.perform(post("/api/photographes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(photographe)))
            .andExpect(status().isBadRequest());

        // Validate the Photographe in the database
        List<Photographe> photographeList = photographeRepository.findAll();
        assertThat(photographeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPhotographes() throws Exception {
        // Initialize the database
        photographeRepository.saveAndFlush(photographe);

        // Get all the photographeList
        restPhotographeMockMvc.perform(get("/api/photographes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(photographe.getId().intValue())))
            .andExpect(jsonPath("$.[*].experience").value(hasItem(DEFAULT_EXPERIENCE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPhotographesWithEagerRelationshipsIsEnabled() throws Exception {
        PhotographeResource photographeResource = new PhotographeResource(photographeRepositoryMock);
        when(photographeRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restPhotographeMockMvc = MockMvcBuilders.standaloneSetup(photographeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPhotographeMockMvc.perform(get("/api/photographes?eagerload=true"))
        .andExpect(status().isOk());

        verify(photographeRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPhotographesWithEagerRelationshipsIsNotEnabled() throws Exception {
        PhotographeResource photographeResource = new PhotographeResource(photographeRepositoryMock);
            when(photographeRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restPhotographeMockMvc = MockMvcBuilders.standaloneSetup(photographeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPhotographeMockMvc.perform(get("/api/photographes?eagerload=true"))
        .andExpect(status().isOk());

            verify(photographeRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPhotographe() throws Exception {
        // Initialize the database
        photographeRepository.saveAndFlush(photographe);

        // Get the photographe
        restPhotographeMockMvc.perform(get("/api/photographes/{id}", photographe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(photographe.getId().intValue()))
            .andExpect(jsonPath("$.experience").value(DEFAULT_EXPERIENCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPhotographe() throws Exception {
        // Get the photographe
        restPhotographeMockMvc.perform(get("/api/photographes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePhotographe() throws Exception {
        // Initialize the database
        photographeRepository.saveAndFlush(photographe);

        int databaseSizeBeforeUpdate = photographeRepository.findAll().size();

        // Update the photographe
        Photographe updatedPhotographe = photographeRepository.findById(photographe.getId()).get();
        // Disconnect from session so that the updates on updatedPhotographe are not directly saved in db
        em.detach(updatedPhotographe);
        updatedPhotographe
            .experience(UPDATED_EXPERIENCE);

        restPhotographeMockMvc.perform(put("/api/photographes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPhotographe)))
            .andExpect(status().isOk());

        // Validate the Photographe in the database
        List<Photographe> photographeList = photographeRepository.findAll();
        assertThat(photographeList).hasSize(databaseSizeBeforeUpdate);
        Photographe testPhotographe = photographeList.get(photographeList.size() - 1);
        assertThat(testPhotographe.getExperience()).isEqualTo(UPDATED_EXPERIENCE);
    }

    @Test
    @Transactional
    public void updateNonExistingPhotographe() throws Exception {
        int databaseSizeBeforeUpdate = photographeRepository.findAll().size();

        // Create the Photographe

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPhotographeMockMvc.perform(put("/api/photographes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(photographe)))
            .andExpect(status().isBadRequest());

        // Validate the Photographe in the database
        List<Photographe> photographeList = photographeRepository.findAll();
        assertThat(photographeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePhotographe() throws Exception {
        // Initialize the database
        photographeRepository.saveAndFlush(photographe);

        int databaseSizeBeforeDelete = photographeRepository.findAll().size();

        // Delete the photographe
        restPhotographeMockMvc.perform(delete("/api/photographes/{id}", photographe.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Photographe> photographeList = photographeRepository.findAll();
        assertThat(photographeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Photographe.class);
        Photographe photographe1 = new Photographe();
        photographe1.setId(1L);
        Photographe photographe2 = new Photographe();
        photographe2.setId(photographe1.getId());
        assertThat(photographe1).isEqualTo(photographe2);
        photographe2.setId(2L);
        assertThat(photographe1).isNotEqualTo(photographe2);
        photographe1.setId(null);
        assertThat(photographe1).isNotEqualTo(photographe2);
    }
}
