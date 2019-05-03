package io.bookapp.web.rest;

import io.bookapp.BookApplicationApp;
import io.bookapp.domain.Hotesse;
import io.bookapp.repository.HotesseRepository;
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
import io.bookapp.domain.enumeration.TypeHotesse;
import io.bookapp.domain.enumeration.Disponibilite;
/**
 * Integration tests for the {@Link HotesseResource} REST controller.
 */
@SpringBootTest(classes = BookApplicationApp.class)
public class HotesseResourceIT {

    private static final Long DEFAULT_TAILLE = 1L;
    private static final Long UPDATED_TAILLE = 2L;

    private static final Long DEFAULT_POIDS = 1L;
    private static final Long UPDATED_POIDS = 2L;

    private static final Experience DEFAULT_EXPERIENCE = Experience.DEBUTANT;
    private static final Experience UPDATED_EXPERIENCE = Experience.AMATEUR;

    private static final TypeHotesse DEFAULT_TYPE = TypeHotesse.HOTESSE;
    private static final TypeHotesse UPDATED_TYPE = TypeHotesse.ANIMATRICE;

    private static final Boolean DEFAULT_DEPLACEMENT = false;
    private static final Boolean UPDATED_DEPLACEMENT = true;

    private static final Disponibilite DEFAULT_DISPONIBILITE = Disponibilite.JOUR;
    private static final Disponibilite UPDATED_DISPONIBILITE = Disponibilite.SOIR;

    @Autowired
    private HotesseRepository hotesseRepository;

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

    private MockMvc restHotesseMockMvc;

    private Hotesse hotesse;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HotesseResource hotesseResource = new HotesseResource(hotesseRepository);
        this.restHotesseMockMvc = MockMvcBuilders.standaloneSetup(hotesseResource)
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
    public static Hotesse createEntity(EntityManager em) {
        Hotesse hotesse = new Hotesse()
            .taille(DEFAULT_TAILLE)
            .poids(DEFAULT_POIDS)
            .experience(DEFAULT_EXPERIENCE)
            .type(DEFAULT_TYPE)
            .deplacement(DEFAULT_DEPLACEMENT)
            .disponibilite(DEFAULT_DISPONIBILITE);
        return hotesse;
    }

    @BeforeEach
    public void initTest() {
        hotesse = createEntity(em);
    }

    @Test
    @Transactional
    public void createHotesse() throws Exception {
        int databaseSizeBeforeCreate = hotesseRepository.findAll().size();

        // Create the Hotesse
        restHotesseMockMvc.perform(post("/api/hotesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotesse)))
            .andExpect(status().isCreated());

        // Validate the Hotesse in the database
        List<Hotesse> hotesseList = hotesseRepository.findAll();
        assertThat(hotesseList).hasSize(databaseSizeBeforeCreate + 1);
        Hotesse testHotesse = hotesseList.get(hotesseList.size() - 1);
        assertThat(testHotesse.getTaille()).isEqualTo(DEFAULT_TAILLE);
        assertThat(testHotesse.getPoids()).isEqualTo(DEFAULT_POIDS);
        assertThat(testHotesse.getExperience()).isEqualTo(DEFAULT_EXPERIENCE);
        assertThat(testHotesse.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testHotesse.isDeplacement()).isEqualTo(DEFAULT_DEPLACEMENT);
        assertThat(testHotesse.getDisponibilite()).isEqualTo(DEFAULT_DISPONIBILITE);
    }

    @Test
    @Transactional
    public void createHotesseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hotesseRepository.findAll().size();

        // Create the Hotesse with an existing ID
        hotesse.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHotesseMockMvc.perform(post("/api/hotesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotesse)))
            .andExpect(status().isBadRequest());

        // Validate the Hotesse in the database
        List<Hotesse> hotesseList = hotesseRepository.findAll();
        assertThat(hotesseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllHotesses() throws Exception {
        // Initialize the database
        hotesseRepository.saveAndFlush(hotesse);

        // Get all the hotesseList
        restHotesseMockMvc.perform(get("/api/hotesses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hotesse.getId().intValue())))
            .andExpect(jsonPath("$.[*].taille").value(hasItem(DEFAULT_TAILLE.intValue())))
            .andExpect(jsonPath("$.[*].poids").value(hasItem(DEFAULT_POIDS.intValue())))
            .andExpect(jsonPath("$.[*].experience").value(hasItem(DEFAULT_EXPERIENCE.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].deplacement").value(hasItem(DEFAULT_DEPLACEMENT.booleanValue())))
            .andExpect(jsonPath("$.[*].disponibilite").value(hasItem(DEFAULT_DISPONIBILITE.toString())));
    }
    
    @Test
    @Transactional
    public void getHotesse() throws Exception {
        // Initialize the database
        hotesseRepository.saveAndFlush(hotesse);

        // Get the hotesse
        restHotesseMockMvc.perform(get("/api/hotesses/{id}", hotesse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hotesse.getId().intValue()))
            .andExpect(jsonPath("$.taille").value(DEFAULT_TAILLE.intValue()))
            .andExpect(jsonPath("$.poids").value(DEFAULT_POIDS.intValue()))
            .andExpect(jsonPath("$.experience").value(DEFAULT_EXPERIENCE.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.deplacement").value(DEFAULT_DEPLACEMENT.booleanValue()))
            .andExpect(jsonPath("$.disponibilite").value(DEFAULT_DISPONIBILITE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHotesse() throws Exception {
        // Get the hotesse
        restHotesseMockMvc.perform(get("/api/hotesses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHotesse() throws Exception {
        // Initialize the database
        hotesseRepository.saveAndFlush(hotesse);

        int databaseSizeBeforeUpdate = hotesseRepository.findAll().size();

        // Update the hotesse
        Hotesse updatedHotesse = hotesseRepository.findById(hotesse.getId()).get();
        // Disconnect from session so that the updates on updatedHotesse are not directly saved in db
        em.detach(updatedHotesse);
        updatedHotesse
            .taille(UPDATED_TAILLE)
            .poids(UPDATED_POIDS)
            .experience(UPDATED_EXPERIENCE)
            .type(UPDATED_TYPE)
            .deplacement(UPDATED_DEPLACEMENT)
            .disponibilite(UPDATED_DISPONIBILITE);

        restHotesseMockMvc.perform(put("/api/hotesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHotesse)))
            .andExpect(status().isOk());

        // Validate the Hotesse in the database
        List<Hotesse> hotesseList = hotesseRepository.findAll();
        assertThat(hotesseList).hasSize(databaseSizeBeforeUpdate);
        Hotesse testHotesse = hotesseList.get(hotesseList.size() - 1);
        assertThat(testHotesse.getTaille()).isEqualTo(UPDATED_TAILLE);
        assertThat(testHotesse.getPoids()).isEqualTo(UPDATED_POIDS);
        assertThat(testHotesse.getExperience()).isEqualTo(UPDATED_EXPERIENCE);
        assertThat(testHotesse.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testHotesse.isDeplacement()).isEqualTo(UPDATED_DEPLACEMENT);
        assertThat(testHotesse.getDisponibilite()).isEqualTo(UPDATED_DISPONIBILITE);
    }

    @Test
    @Transactional
    public void updateNonExistingHotesse() throws Exception {
        int databaseSizeBeforeUpdate = hotesseRepository.findAll().size();

        // Create the Hotesse

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHotesseMockMvc.perform(put("/api/hotesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotesse)))
            .andExpect(status().isBadRequest());

        // Validate the Hotesse in the database
        List<Hotesse> hotesseList = hotesseRepository.findAll();
        assertThat(hotesseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHotesse() throws Exception {
        // Initialize the database
        hotesseRepository.saveAndFlush(hotesse);

        int databaseSizeBeforeDelete = hotesseRepository.findAll().size();

        // Delete the hotesse
        restHotesseMockMvc.perform(delete("/api/hotesses/{id}", hotesse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Hotesse> hotesseList = hotesseRepository.findAll();
        assertThat(hotesseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Hotesse.class);
        Hotesse hotesse1 = new Hotesse();
        hotesse1.setId(1L);
        Hotesse hotesse2 = new Hotesse();
        hotesse2.setId(hotesse1.getId());
        assertThat(hotesse1).isEqualTo(hotesse2);
        hotesse2.setId(2L);
        assertThat(hotesse1).isNotEqualTo(hotesse2);
        hotesse1.setId(null);
        assertThat(hotesse1).isNotEqualTo(hotesse2);
    }
}
