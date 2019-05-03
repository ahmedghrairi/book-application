package io.bookapp.web.rest;

import io.bookapp.domain.Styliste;
import io.bookapp.repository.StylisteRepository;
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
 * REST controller for managing {@link io.bookapp.domain.Styliste}.
 */
@RestController
@RequestMapping("/api")
public class StylisteResource {

    private final Logger log = LoggerFactory.getLogger(StylisteResource.class);

    private static final String ENTITY_NAME = "styliste";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StylisteRepository stylisteRepository;

    public StylisteResource(StylisteRepository stylisteRepository) {
        this.stylisteRepository = stylisteRepository;
    }

    /**
     * {@code POST  /stylistes} : Create a new styliste.
     *
     * @param styliste the styliste to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new styliste, or with status {@code 400 (Bad Request)} if the styliste has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/stylistes")
    public ResponseEntity<Styliste> createStyliste(@RequestBody Styliste styliste) throws URISyntaxException {
        log.debug("REST request to save Styliste : {}", styliste);
        if (styliste.getId() != null) {
            throw new BadRequestAlertException("A new styliste cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Styliste result = stylisteRepository.save(styliste);
        return ResponseEntity.created(new URI("/api/stylistes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /stylistes} : Updates an existing styliste.
     *
     * @param styliste the styliste to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated styliste,
     * or with status {@code 400 (Bad Request)} if the styliste is not valid,
     * or with status {@code 500 (Internal Server Error)} if the styliste couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/stylistes")
    public ResponseEntity<Styliste> updateStyliste(@RequestBody Styliste styliste) throws URISyntaxException {
        log.debug("REST request to update Styliste : {}", styliste);
        if (styliste.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Styliste result = stylisteRepository.save(styliste);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, styliste.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /stylistes} : get all the stylistes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stylistes in body.
     */
    @GetMapping("/stylistes")
    public List<Styliste> getAllStylistes() {
        log.debug("REST request to get all Stylistes");
        return stylisteRepository.findAll();
    }

    /**
     * {@code GET  /stylistes/:id} : get the "id" styliste.
     *
     * @param id the id of the styliste to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the styliste, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/stylistes/{id}")
    public ResponseEntity<Styliste> getStyliste(@PathVariable Long id) {
        log.debug("REST request to get Styliste : {}", id);
        Optional<Styliste> styliste = stylisteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(styliste);
    }

    /**
     * {@code DELETE  /stylistes/:id} : delete the "id" styliste.
     *
     * @param id the id of the styliste to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/stylistes/{id}")
    public ResponseEntity<Void> deleteStyliste(@PathVariable Long id) {
        log.debug("REST request to delete Styliste : {}", id);
        stylisteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
