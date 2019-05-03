package io.bookapp.web.rest;

import io.bookapp.BookApplicationApp;
import io.bookapp.domain.Modele;
import io.bookapp.repository.ModeleRepository;
import io.bookapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
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

import io.bookapp.domain.enumeration.CouleurYeux;
import io.bookapp.domain.enumeration.CouleurCheveux;
import io.bookapp.domain.enumeration.Experience;
import io.bookapp.domain.enumeration.TypeModele;
/**
 * Integration tests for the {@Link ModeleResource} REST controller.
 */
@SpringBootTest(classes = BookApplicationApp.class)
public class ModeleResourceIT {

    private static final Long DEFAULT_TAILLE = 1L;
    private static final Long UPDATED_TAILLE = 2L;

    private static final Long DEFAULT_POIDS = 1L;
    private static final Long UPDATED_POIDS = 2L;

    private static final Long DEFAULT_POINTURE = 1L;
    private static final Long UPDATED_POINTURE = 2L;

    private static final Long DEFAULT_TAILLE_POITRINE = 1L;
    private static final Long UPDATED_TAILLE_POITRINE = 2L;

    private static final Long DEFAULT_TOUR_DE_TAILLE = 1L;
    private static final Long UPDATED_TOUR_DE_TAILLE = 2L;

    private static final Long DEFAULT_TOUR_DE_HANCHE = 1L;
    private static final Long UPDATED_TOUR_DE_HANCHE = 2L;

    private static final CouleurYeux DEFAULT_COULEUR_DES_YEUX = CouleurYeux.VERT;
    private static final CouleurYeux UPDATED_COULEUR_DES_YEUX = CouleurYeux.BLEU;

    private static final CouleurCheveux DEFAULT_COULEUR_DE_CHEVEUX = CouleurCheveux.VERT;
    private static final CouleurCheveux UPDATED_COULEUR_DE_CHEVEUX = CouleurCheveux.BLEU;

    private static final Experience DEFAULT_EXPERIENCE = Experience.DEBUTANT;
    private static final Experience UPDATED_EXPERIENCE = Experience.AMATEUR;

    private static final TypeModele DEFAULT_TYPE = TypeModele.MODELE;
    private static final TypeModele UPDATED_TYPE = TypeModele.MANNEQUIN;

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    @Autowired
    private ModeleRepository modeleRepository;

    @Mock
    private ModeleRepository modeleRepositoryMock;

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

    private MockMvc restModeleMockMvc;

    private Modele modele;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ModeleResource modeleResource = new ModeleResource(modeleRepository);
        this.restModeleMockMvc = MockMvcBuilders.standaloneSetup(modeleResource)
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
    public static Modele createEntity(EntityManager em) {
        Modele modele = new Modele()
            .taille(DEFAULT_TAILLE)
            .poids(DEFAULT_POIDS)
            .pointure(DEFAULT_POINTURE)
            .taillePoitrine(DEFAULT_TAILLE_POITRINE)
            .tourDeTaille(DEFAULT_TOUR_DE_TAILLE)
            .tourDeHanche(DEFAULT_TOUR_DE_HANCHE)
            .couleurDesYeux(DEFAULT_COULEUR_DES_YEUX)
            .couleurDeCheveux(DEFAULT_COULEUR_DE_CHEVEUX)
            .experience(DEFAULT_EXPERIENCE)
            .type(DEFAULT_TYPE)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE);
        return modele;
    }

    @BeforeEach
    public void initTest() {
        modele = createEntity(em);
    }

    @Test
    @Transactional
    public void createModele() throws Exception {
        int databaseSizeBeforeCreate = modeleRepository.findAll().size();

        // Create the Modele
        restModeleMockMvc.perform(post("/api/modeles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modele)))
            .andExpect(status().isCreated());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeCreate + 1);
        Modele testModele = modeleList.get(modeleList.size() - 1);
        assertThat(testModele.getTaille()).isEqualTo(DEFAULT_TAILLE);
        assertThat(testModele.getPoids()).isEqualTo(DEFAULT_POIDS);
        assertThat(testModele.getPointure()).isEqualTo(DEFAULT_POINTURE);
        assertThat(testModele.getTaillePoitrine()).isEqualTo(DEFAULT_TAILLE_POITRINE);
        assertThat(testModele.getTourDeTaille()).isEqualTo(DEFAULT_TOUR_DE_TAILLE);
        assertThat(testModele.getTourDeHanche()).isEqualTo(DEFAULT_TOUR_DE_HANCHE);
        assertThat(testModele.getCouleurDesYeux()).isEqualTo(DEFAULT_COULEUR_DES_YEUX);
        assertThat(testModele.getCouleurDeCheveux()).isEqualTo(DEFAULT_COULEUR_DE_CHEVEUX);
        assertThat(testModele.getExperience()).isEqualTo(DEFAULT_EXPERIENCE);
        assertThat(testModele.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testModele.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testModele.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createModeleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = modeleRepository.findAll().size();

        // Create the Modele with an existing ID
        modele.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModeleMockMvc.perform(post("/api/modeles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modele)))
            .andExpect(status().isBadRequest());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllModeles() throws Exception {
        // Initialize the database
        modeleRepository.saveAndFlush(modele);

        // Get all the modeleList
        restModeleMockMvc.perform(get("/api/modeles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(modele.getId().intValue())))
            .andExpect(jsonPath("$.[*].taille").value(hasItem(DEFAULT_TAILLE.intValue())))
            .andExpect(jsonPath("$.[*].poids").value(hasItem(DEFAULT_POIDS.intValue())))
            .andExpect(jsonPath("$.[*].pointure").value(hasItem(DEFAULT_POINTURE.intValue())))
            .andExpect(jsonPath("$.[*].taillePoitrine").value(hasItem(DEFAULT_TAILLE_POITRINE.intValue())))
            .andExpect(jsonPath("$.[*].tourDeTaille").value(hasItem(DEFAULT_TOUR_DE_TAILLE.intValue())))
            .andExpect(jsonPath("$.[*].tourDeHanche").value(hasItem(DEFAULT_TOUR_DE_HANCHE.intValue())))
            .andExpect(jsonPath("$.[*].couleurDesYeux").value(hasItem(DEFAULT_COULEUR_DES_YEUX.toString())))
            .andExpect(jsonPath("$.[*].couleurDeCheveux").value(hasItem(DEFAULT_COULEUR_DE_CHEVEUX.toString())))
            .andExpect(jsonPath("$.[*].experience").value(hasItem(DEFAULT_EXPERIENCE.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllModelesWithEagerRelationshipsIsEnabled() throws Exception {
        ModeleResource modeleResource = new ModeleResource(modeleRepositoryMock);
        when(modeleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restModeleMockMvc = MockMvcBuilders.standaloneSetup(modeleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restModeleMockMvc.perform(get("/api/modeles?eagerload=true"))
        .andExpect(status().isOk());

        verify(modeleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllModelesWithEagerRelationshipsIsNotEnabled() throws Exception {
        ModeleResource modeleResource = new ModeleResource(modeleRepositoryMock);
            when(modeleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restModeleMockMvc = MockMvcBuilders.standaloneSetup(modeleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restModeleMockMvc.perform(get("/api/modeles?eagerload=true"))
        .andExpect(status().isOk());

            verify(modeleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getModele() throws Exception {
        // Initialize the database
        modeleRepository.saveAndFlush(modele);

        // Get the modele
        restModeleMockMvc.perform(get("/api/modeles/{id}", modele.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(modele.getId().intValue()))
            .andExpect(jsonPath("$.taille").value(DEFAULT_TAILLE.intValue()))
            .andExpect(jsonPath("$.poids").value(DEFAULT_POIDS.intValue()))
            .andExpect(jsonPath("$.pointure").value(DEFAULT_POINTURE.intValue()))
            .andExpect(jsonPath("$.taillePoitrine").value(DEFAULT_TAILLE_POITRINE.intValue()))
            .andExpect(jsonPath("$.tourDeTaille").value(DEFAULT_TOUR_DE_TAILLE.intValue()))
            .andExpect(jsonPath("$.tourDeHanche").value(DEFAULT_TOUR_DE_HANCHE.intValue()))
            .andExpect(jsonPath("$.couleurDesYeux").value(DEFAULT_COULEUR_DES_YEUX.toString()))
            .andExpect(jsonPath("$.couleurDeCheveux").value(DEFAULT_COULEUR_DE_CHEVEUX.toString()))
            .andExpect(jsonPath("$.experience").value(DEFAULT_EXPERIENCE.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)));
    }

    @Test
    @Transactional
    public void getNonExistingModele() throws Exception {
        // Get the modele
        restModeleMockMvc.perform(get("/api/modeles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModele() throws Exception {
        // Initialize the database
        modeleRepository.saveAndFlush(modele);

        int databaseSizeBeforeUpdate = modeleRepository.findAll().size();

        // Update the modele
        Modele updatedModele = modeleRepository.findById(modele.getId()).get();
        // Disconnect from session so that the updates on updatedModele are not directly saved in db
        em.detach(updatedModele);
        updatedModele
            .taille(UPDATED_TAILLE)
            .poids(UPDATED_POIDS)
            .pointure(UPDATED_POINTURE)
            .taillePoitrine(UPDATED_TAILLE_POITRINE)
            .tourDeTaille(UPDATED_TOUR_DE_TAILLE)
            .tourDeHanche(UPDATED_TOUR_DE_HANCHE)
            .couleurDesYeux(UPDATED_COULEUR_DES_YEUX)
            .couleurDeCheveux(UPDATED_COULEUR_DE_CHEVEUX)
            .experience(UPDATED_EXPERIENCE)
            .type(UPDATED_TYPE)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE);

        restModeleMockMvc.perform(put("/api/modeles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedModele)))
            .andExpect(status().isOk());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeUpdate);
        Modele testModele = modeleList.get(modeleList.size() - 1);
        assertThat(testModele.getTaille()).isEqualTo(UPDATED_TAILLE);
        assertThat(testModele.getPoids()).isEqualTo(UPDATED_POIDS);
        assertThat(testModele.getPointure()).isEqualTo(UPDATED_POINTURE);
        assertThat(testModele.getTaillePoitrine()).isEqualTo(UPDATED_TAILLE_POITRINE);
        assertThat(testModele.getTourDeTaille()).isEqualTo(UPDATED_TOUR_DE_TAILLE);
        assertThat(testModele.getTourDeHanche()).isEqualTo(UPDATED_TOUR_DE_HANCHE);
        assertThat(testModele.getCouleurDesYeux()).isEqualTo(UPDATED_COULEUR_DES_YEUX);
        assertThat(testModele.getCouleurDeCheveux()).isEqualTo(UPDATED_COULEUR_DE_CHEVEUX);
        assertThat(testModele.getExperience()).isEqualTo(UPDATED_EXPERIENCE);
        assertThat(testModele.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testModele.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testModele.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingModele() throws Exception {
        int databaseSizeBeforeUpdate = modeleRepository.findAll().size();

        // Create the Modele

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restModeleMockMvc.perform(put("/api/modeles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modele)))
            .andExpect(status().isBadRequest());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteModele() throws Exception {
        // Initialize the database
        modeleRepository.saveAndFlush(modele);

        int databaseSizeBeforeDelete = modeleRepository.findAll().size();

        // Delete the modele
        restModeleMockMvc.perform(delete("/api/modeles/{id}", modele.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Modele.class);
        Modele modele1 = new Modele();
        modele1.setId(1L);
        Modele modele2 = new Modele();
        modele2.setId(modele1.getId());
        assertThat(modele1).isEqualTo(modele2);
        modele2.setId(2L);
        assertThat(modele1).isNotEqualTo(modele2);
        modele1.setId(null);
        assertThat(modele1).isNotEqualTo(modele2);
    }
}
