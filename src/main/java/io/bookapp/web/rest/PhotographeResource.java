package io.bookapp.web.rest;
import io.bookapp.domain.Photographe;
import io.bookapp.repository.PhotographeRepository;
import io.bookapp.web.rest.errors.BadRequestAlertException;
import io.bookapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Photographe.
 */
@RestController
@RequestMapping("/api")
public class PhotographeResource {

    private final Logger log = LoggerFactory.getLogger(PhotographeResource.class);

    private static final String ENTITY_NAME = "photographe";

    private final PhotographeRepository photographeRepository;

    public PhotographeResource(PhotographeRepository photographeRepository) {
        this.photographeRepository = photographeRepository;
    }

    /**
     * POST  /photographes : Create a new photographe.
     *
     * @param photographe the photographe to create
     * @return the ResponseEntity with status 201 (Created) and with body the new photographe, or with status 400 (Bad Request) if the photographe has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/photographes")
    public ResponseEntity<Photographe> createPhotographe(@RequestBody Photographe photographe) throws URISyntaxException {
        log.debug("REST request to save Photographe : {}", photographe);
        if (photographe.getId() != null) {
            throw new BadRequestAlertException("A new photographe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Photographe result = photographeRepository.save(photographe);
        return ResponseEntity.created(new URI("/api/photographes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /photographes : Updates an existing photographe.
     *
     * @param photographe the photographe to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated photographe,
     * or with status 400 (Bad Request) if the photographe is not valid,
     * or with status 500 (Internal Server Error) if the photographe couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/photographes")
    public ResponseEntity<Photographe> updatePhotographe(@RequestBody Photographe photographe) throws URISyntaxException {
        log.debug("REST request to update Photographe : {}", photographe);
        if (photographe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Photographe result = photographeRepository.save(photographe);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, photographe.getId().toString()))
            .body(result);
    }

    /**
     * GET  /photographes : get all the photographes.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of photographes in body
     */
    @GetMapping("/photographes")
    public List<Photographe> getAllPhotographes(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Photographes");
        return photographeRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /photographes/:id : get the "id" photographe.
     *
     * @param id the id of the photographe to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the photographe, or with status 404 (Not Found)
     */
    @GetMapping("/photographes/{id}")
    public ResponseEntity<Photographe> getPhotographe(@PathVariable Long id) {
        log.debug("REST request to get Photographe : {}", id);
        Optional<Photographe> photographe = photographeRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(photographe);
    }

    /**
     * DELETE  /photographes/:id : delete the "id" photographe.
     *
     * @param id the id of the photographe to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/photographes/{id}")
    public ResponseEntity<Void> deletePhotographe(@PathVariable Long id) {
        log.debug("REST request to delete Photographe : {}", id);
        photographeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
