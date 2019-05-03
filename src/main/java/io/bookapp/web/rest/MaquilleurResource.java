package io.bookapp.web.rest;

import io.bookapp.domain.Maquilleur;
import io.bookapp.repository.MaquilleurRepository;
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
 * REST controller for managing {@link io.bookapp.domain.Maquilleur}.
 */
@RestController
@RequestMapping("/api")
public class MaquilleurResource {

    private final Logger log = LoggerFactory.getLogger(MaquilleurResource.class);

    private static final String ENTITY_NAME = "maquilleur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MaquilleurRepository maquilleurRepository;

    public MaquilleurResource(MaquilleurRepository maquilleurRepository) {
        this.maquilleurRepository = maquilleurRepository;
    }

    /**
     * {@code POST  /maquilleurs} : Create a new maquilleur.
     *
     * @param maquilleur the maquilleur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new maquilleur, or with status {@code 400 (Bad Request)} if the maquilleur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/maquilleurs")
    public ResponseEntity<Maquilleur> createMaquilleur(@RequestBody Maquilleur maquilleur) throws URISyntaxException {
        log.debug("REST request to save Maquilleur : {}", maquilleur);
        if (maquilleur.getId() != null) {
            throw new BadRequestAlertException("A new maquilleur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Maquilleur result = maquilleurRepository.save(maquilleur);
        return ResponseEntity.created(new URI("/api/maquilleurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /maquilleurs} : Updates an existing maquilleur.
     *
     * @param maquilleur the maquilleur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated maquilleur,
     * or with status {@code 400 (Bad Request)} if the maquilleur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the maquilleur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/maquilleurs")
    public ResponseEntity<Maquilleur> updateMaquilleur(@RequestBody Maquilleur maquilleur) throws URISyntaxException {
        log.debug("REST request to update Maquilleur : {}", maquilleur);
        if (maquilleur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Maquilleur result = maquilleurRepository.save(maquilleur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, maquilleur.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /maquilleurs} : get all the maquilleurs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of maquilleurs in body.
     */
    @GetMapping("/maquilleurs")
    public List<Maquilleur> getAllMaquilleurs() {
        log.debug("REST request to get all Maquilleurs");
        return maquilleurRepository.findAll();
    }

    /**
     * {@code GET  /maquilleurs/:id} : get the "id" maquilleur.
     *
     * @param id the id of the maquilleur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the maquilleur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/maquilleurs/{id}")
    public ResponseEntity<Maquilleur> getMaquilleur(@PathVariable Long id) {
        log.debug("REST request to get Maquilleur : {}", id);
        Optional<Maquilleur> maquilleur = maquilleurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(maquilleur);
    }

    /**
     * {@code DELETE  /maquilleurs/:id} : delete the "id" maquilleur.
     *
     * @param id the id of the maquilleur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/maquilleurs/{id}")
    public ResponseEntity<Void> deleteMaquilleur(@PathVariable Long id) {
        log.debug("REST request to delete Maquilleur : {}", id);
        maquilleurRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
