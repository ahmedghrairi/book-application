package io.bookapp.web.rest;

import io.bookapp.domain.StylePhoto;
import io.bookapp.repository.StylePhotoRepository;
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
 * REST controller for managing {@link io.bookapp.domain.StylePhoto}.
 */
@RestController
@RequestMapping("/api")
public class StylePhotoResource {

    private final Logger log = LoggerFactory.getLogger(StylePhotoResource.class);

    private static final String ENTITY_NAME = "stylePhoto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StylePhotoRepository stylePhotoRepository;

    public StylePhotoResource(StylePhotoRepository stylePhotoRepository) {
        this.stylePhotoRepository = stylePhotoRepository;
    }

    /**
     * {@code POST  /style-photos} : Create a new stylePhoto.
     *
     * @param stylePhoto the stylePhoto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new stylePhoto, or with status {@code 400 (Bad Request)} if the stylePhoto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/style-photos")
    public ResponseEntity<StylePhoto> createStylePhoto(@RequestBody StylePhoto stylePhoto) throws URISyntaxException {
        log.debug("REST request to save StylePhoto : {}", stylePhoto);
        if (stylePhoto.getId() != null) {
            throw new BadRequestAlertException("A new stylePhoto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StylePhoto result = stylePhotoRepository.save(stylePhoto);
        return ResponseEntity.created(new URI("/api/style-photos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /style-photos} : Updates an existing stylePhoto.
     *
     * @param stylePhoto the stylePhoto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stylePhoto,
     * or with status {@code 400 (Bad Request)} if the stylePhoto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the stylePhoto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/style-photos")
    public ResponseEntity<StylePhoto> updateStylePhoto(@RequestBody StylePhoto stylePhoto) throws URISyntaxException {
        log.debug("REST request to update StylePhoto : {}", stylePhoto);
        if (stylePhoto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StylePhoto result = stylePhotoRepository.save(stylePhoto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, stylePhoto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /style-photos} : get all the stylePhotos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stylePhotos in body.
     */
    @GetMapping("/style-photos")
    public List<StylePhoto> getAllStylePhotos() {
        log.debug("REST request to get all StylePhotos");
        return stylePhotoRepository.findAll();
    }

    /**
     * {@code GET  /style-photos/:id} : get the "id" stylePhoto.
     *
     * @param id the id of the stylePhoto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the stylePhoto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/style-photos/{id}")
    public ResponseEntity<StylePhoto> getStylePhoto(@PathVariable Long id) {
        log.debug("REST request to get StylePhoto : {}", id);
        Optional<StylePhoto> stylePhoto = stylePhotoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(stylePhoto);
    }

    /**
     * {@code DELETE  /style-photos/:id} : delete the "id" stylePhoto.
     *
     * @param id the id of the stylePhoto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/style-photos/{id}")
    public ResponseEntity<Void> deleteStylePhoto(@PathVariable Long id) {
        log.debug("REST request to delete StylePhoto : {}", id);
        stylePhotoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
