package io.bookapp.web.rest;
import io.bookapp.domain.Maquilleur;
import io.bookapp.repository.MaquilleurRepository;
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
 * REST controller for managing Maquilleur.
 */
@RestController
@RequestMapping("/api")
public class MaquilleurResource {

    private final Logger log = LoggerFactory.getLogger(MaquilleurResource.class);

    private static final String ENTITY_NAME = "maquilleur";

    private final MaquilleurRepository maquilleurRepository;

    public MaquilleurResource(MaquilleurRepository maquilleurRepository) {
        this.maquilleurRepository = maquilleurRepository;
    }

    /**
     * POST  /maquilleurs : Create a new maquilleur.
     *
     * @param maquilleur the maquilleur to create
     * @return the ResponseEntity with status 201 (Created) and with body the new maquilleur, or with status 400 (Bad Request) if the maquilleur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/maquilleurs")
    public ResponseEntity<Maquilleur> createMaquilleur(@RequestBody Maquilleur maquilleur) throws URISyntaxException {
        log.debug("REST request to save Maquilleur : {}", maquilleur);
        if (maquilleur.getId() != null) {
            throw new BadRequestAlertException("A new maquilleur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Maquilleur result = maquilleurRepository.save(maquilleur);
        return ResponseEntity.created(new URI("/api/maquilleurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /maquilleurs : Updates an existing maquilleur.
     *
     * @param maquilleur the maquilleur to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated maquilleur,
     * or with status 400 (Bad Request) if the maquilleur is not valid,
     * or with status 500 (Internal Server Error) if the maquilleur couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/maquilleurs")
    public ResponseEntity<Maquilleur> updateMaquilleur(@RequestBody Maquilleur maquilleur) throws URISyntaxException {
        log.debug("REST request to update Maquilleur : {}", maquilleur);
        if (maquilleur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Maquilleur result = maquilleurRepository.save(maquilleur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, maquilleur.getId().toString()))
            .body(result);
    }

    /**
     * GET  /maquilleurs : get all the maquilleurs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of maquilleurs in body
     */
    @GetMapping("/maquilleurs")
    public List<Maquilleur> getAllMaquilleurs() {
        log.debug("REST request to get all Maquilleurs");
        return maquilleurRepository.findAll();
    }

    /**
     * GET  /maquilleurs/:id : get the "id" maquilleur.
     *
     * @param id the id of the maquilleur to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the maquilleur, or with status 404 (Not Found)
     */
    @GetMapping("/maquilleurs/{id}")
    public ResponseEntity<Maquilleur> getMaquilleur(@PathVariable Long id) {
        log.debug("REST request to get Maquilleur : {}", id);
        Optional<Maquilleur> maquilleur = maquilleurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(maquilleur);
    }

    /**
     * DELETE  /maquilleurs/:id : delete the "id" maquilleur.
     *
     * @param id the id of the maquilleur to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/maquilleurs/{id}")
    public ResponseEntity<Void> deleteMaquilleur(@PathVariable Long id) {
        log.debug("REST request to delete Maquilleur : {}", id);
        maquilleurRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
