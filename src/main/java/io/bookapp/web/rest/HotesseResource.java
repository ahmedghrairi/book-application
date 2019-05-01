package io.bookapp.web.rest;
import io.bookapp.domain.Hotesse;
import io.bookapp.repository.HotesseRepository;
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
 * REST controller for managing Hotesse.
 */
@RestController
@RequestMapping("/api")
public class HotesseResource {

    private final Logger log = LoggerFactory.getLogger(HotesseResource.class);

    private static final String ENTITY_NAME = "hotesse";

    private final HotesseRepository hotesseRepository;

    public HotesseResource(HotesseRepository hotesseRepository) {
        this.hotesseRepository = hotesseRepository;
    }

    /**
     * POST  /hotesses : Create a new hotesse.
     *
     * @param hotesse the hotesse to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hotesse, or with status 400 (Bad Request) if the hotesse has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hotesses")
    public ResponseEntity<Hotesse> createHotesse(@RequestBody Hotesse hotesse) throws URISyntaxException {
        log.debug("REST request to save Hotesse : {}", hotesse);
        if (hotesse.getId() != null) {
            throw new BadRequestAlertException("A new hotesse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Hotesse result = hotesseRepository.save(hotesse);
        return ResponseEntity.created(new URI("/api/hotesses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hotesses : Updates an existing hotesse.
     *
     * @param hotesse the hotesse to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hotesse,
     * or with status 400 (Bad Request) if the hotesse is not valid,
     * or with status 500 (Internal Server Error) if the hotesse couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hotesses")
    public ResponseEntity<Hotesse> updateHotesse(@RequestBody Hotesse hotesse) throws URISyntaxException {
        log.debug("REST request to update Hotesse : {}", hotesse);
        if (hotesse.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Hotesse result = hotesseRepository.save(hotesse);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hotesse.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hotesses : get all the hotesses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hotesses in body
     */
    @GetMapping("/hotesses")
    public List<Hotesse> getAllHotesses() {
        log.debug("REST request to get all Hotesses");
        return hotesseRepository.findAll();
    }

    /**
     * GET  /hotesses/:id : get the "id" hotesse.
     *
     * @param id the id of the hotesse to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hotesse, or with status 404 (Not Found)
     */
    @GetMapping("/hotesses/{id}")
    public ResponseEntity<Hotesse> getHotesse(@PathVariable Long id) {
        log.debug("REST request to get Hotesse : {}", id);
        Optional<Hotesse> hotesse = hotesseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(hotesse);
    }

    /**
     * DELETE  /hotesses/:id : delete the "id" hotesse.
     *
     * @param id the id of the hotesse to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hotesses/{id}")
    public ResponseEntity<Void> deleteHotesse(@PathVariable Long id) {
        log.debug("REST request to delete Hotesse : {}", id);
        hotesseRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
