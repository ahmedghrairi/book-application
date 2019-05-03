package io.bookapp.web.rest;

import io.bookapp.BookApplicationApp;
import io.bookapp.domain.Maquilleur;
import io.bookapp.repository.MaquilleurRepository;
import io.bookapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
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
 * Integration tests for the {@Link MaquilleurResource} REST controller.
 */
@SpringBootTest(classes = BookApplicationApp.class)
public class MaquilleurResourceIT {

    private static final Experience DEFAULT_EXPERIENCE = Experience.DEBUTANT;
    private static final Experience UPDATED_EXPERIENCE = Experience.AMATEUR;

    @Autowired
    private MaquilleurRepository maquilleurRepository;

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

    private MockMvc restMaquilleurMockMvc;

    private Maquilleur maquilleur;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MaquilleurResource maquilleurResource = new MaquilleurResource(maquilleurRepository);
        this.restMaquilleurMockMvc = MockMvcBuilders.standaloneSetup(maquilleurResource)
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
    public static Maquilleur createEntity(EntityManager em) {
        Maquilleur maquilleur = new Maquilleur()
            .experience(DEFAULT_EXPERIENCE);
        return maquilleur;
    }

    @BeforeEach
    public void initTest() {
        maquilleur = createEntity(em);
    }

    @Test
    @Transactional
    public void createMaquilleur() throws Exception {
        int databaseSizeBeforeCreate = maquilleurRepository.findAll().size();

        // Create the Maquilleur
        restMaquilleurMockMvc.perform(post("/api/maquilleurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maquilleur)))
            .andExpect(status().isCreated());

        // Validate the Maquilleur in the database
        List<Maquilleur> maquilleurList = maquilleurRepository.findAll();
        assertThat(maquilleurList).hasSize(databaseSizeBeforeCreate + 1);
        Maquilleur testMaquilleur = maquilleurList.get(maquilleurList.size() - 1);
        assertThat(testMaquilleur.getExperience()).isEqualTo(DEFAULT_EXPERIENCE);
    }

    @Test
    @Transactional
    public void createMaquilleurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = maquilleurRepository.findAll().size();

        // Create the Maquilleur with an existing ID
        maquilleur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaquilleurMockMvc.perform(post("/api/maquilleurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maquilleur)))
            .andExpect(status().isBadRequest());

        // Validate the Maquilleur in the database
        List<Maquilleur> maquilleurList = maquilleurRepository.findAll();
        assertThat(maquilleurList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMaquilleurs() throws Exception {
        // Initialize the database
        maquilleurRepository.saveAndFlush(maquilleur);

        // Get all the maquilleurList
        restMaquilleurMockMvc.perform(get("/api/maquilleurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(maquilleur.getId().intValue())))
            .andExpect(jsonPath("$.[*].experience").value(hasItem(DEFAULT_EXPERIENCE.toString())));
    }
    
    @Test
    @Transactional
    public void getMaquilleur() throws Exception {
        // Initialize the database
        maquilleurRepository.saveAndFlush(maquilleur);

        // Get the maquilleur
        restMaquilleurMockMvc.perform(get("/api/maquilleurs/{id}", maquilleur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(maquilleur.getId().intValue()))
            .andExpect(jsonPath("$.experience").value(DEFAULT_EXPERIENCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMaquilleur() throws Exception {
        // Get the maquilleur
        restMaquilleurMockMvc.perform(get("/api/maquilleurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMaquilleur() throws Exception {
        // Initialize the database
        maquilleurRepository.saveAndFlush(maquilleur);

        int databaseSizeBeforeUpdate = maquilleurRepository.findAll().size();

        // Update the maquilleur
        Maquilleur updatedMaquilleur = maquilleurRepository.findById(maquilleur.getId()).get();
        // Disconnect from session so that the updates on updatedMaquilleur are not directly saved in db
        em.detach(updatedMaquilleur);
        updatedMaquilleur
            .experience(UPDATED_EXPERIENCE);

        restMaquilleurMockMvc.perform(put("/api/maquilleurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMaquilleur)))
            .andExpect(status().isOk());

        // Validate the Maquilleur in the database
        List<Maquilleur> maquilleurList = maquilleurRepository.findAll();
        assertThat(maquilleurList).hasSize(databaseSizeBeforeUpdate);
        Maquilleur testMaquilleur = maquilleurList.get(maquilleurList.size() - 1);
        assertThat(testMaquilleur.getExperience()).isEqualTo(UPDATED_EXPERIENCE);
    }

    @Test
    @Transactional
    public void updateNonExistingMaquilleur() throws Exception {
        int databaseSizeBeforeUpdate = maquilleurRepository.findAll().size();

        // Create the Maquilleur

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMaquilleurMockMvc.perform(put("/api/maquilleurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maquilleur)))
            .andExpect(status().isBadRequest());

        // Validate the Maquilleur in the database
        List<Maquilleur> maquilleurList = maquilleurRepository.findAll();
        assertThat(maquilleurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMaquilleur() throws Exception {
        // Initialize the database
        maquilleurRepository.saveAndFlush(maquilleur);

        int databaseSizeBeforeDelete = maquilleurRepository.findAll().size();

        // Delete the maquilleur
        restMaquilleurMockMvc.perform(delete("/api/maquilleurs/{id}", maquilleur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Maquilleur> maquilleurList = maquilleurRepository.findAll();
        assertThat(maquilleurList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Maquilleur.class);
        Maquilleur maquilleur1 = new Maquilleur();
        maquilleur1.setId(1L);
        Maquilleur maquilleur2 = new Maquilleur();
        maquilleur2.setId(maquilleur1.getId());
        assertThat(maquilleur1).isEqualTo(maquilleur2);
        maquilleur2.setId(2L);
        assertThat(maquilleur1).isNotEqualTo(maquilleur2);
        maquilleur1.setId(null);
        assertThat(maquilleur1).isNotEqualTo(maquilleur2);
    }
}
