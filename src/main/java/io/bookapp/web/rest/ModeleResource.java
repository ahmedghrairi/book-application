package io.bookapp.web.rest;

import io.bookapp.domain.Modele;
import io.bookapp.repository.ModeleRepository;
import io.bookapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.bookapp.domain.Modele}.
 */
@RestController
@RequestMapping("/api")
public class ModeleResource {

    private final Logger log = LoggerFactory.getLogger(ModeleResource.class);

    private static final String ENTITY_NAME = "modele";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ModeleRepository modeleRepository;

    public ModeleResource(ModeleRepository modeleRepository) {
        this.modeleRepository = modeleRepository;
    }

    /**
     * {@code POST  /modeles} : Create a new modele.
     *
     * @param modele the modele to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new modele, or with status {@code 400 (Bad Request)} if the modele has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/modeles")
    public ResponseEntity<Modele> createModele(@RequestBody Modele modele) throws URISyntaxException {
        log.debug("REST request to save Modele : {}", modele);
        if (modele.getId() != null) {
            throw new BadRequestAlertException("A new modele cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Modele result = modeleRepository.save(modele);
        return ResponseEntity.created(new URI("/api/modeles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /modeles} : Updates an existing modele.
     *
     * @param modele the modele to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated modele,
     * or with status {@code 400 (Bad Request)} if the modele is not valid,
     * or with status {@code 500 (Internal Server Error)} if the modele couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/modeles")
    public ResponseEntity<Modele> updateModele(@RequestBody Modele modele) throws URISyntaxException {
        log.debug("REST request to update Modele : {}", modele);
        if (modele.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Modele result = modeleRepository.save(modele);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, modele.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /modeles} : get all the modeles.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of modeles in body.
     */
    @GetMapping("/modeles")
    public List<Modele> getAllModeles(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Modeles");
        return modeleRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /modeles/:id} : get the "id" modele.
     *
     * @param id the id of the modele to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the modele, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/modeles/{id}")
    public ResponseEntity<Modele> getModele(@PathVariable Long id) {
        log.debug("REST request to get Modele : {}", id);
        Optional<Modele> modele = modeleRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(modele);
    }

    /**
     * {@code DELETE  /modeles/:id} : delete the "id" modele.
     *
     * @param id the id of the modele to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/modeles/{id}")
    public ResponseEntity<Void> deleteModele(@PathVariable Long id) {
        log.debug("REST request to delete Modele : {}", id);
        modeleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
