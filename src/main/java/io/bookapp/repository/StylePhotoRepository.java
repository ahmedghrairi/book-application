package io.bookapp.repository;

import io.bookapp.domain.StylePhoto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StylePhoto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StylePhotoRepository extends JpaRepository<StylePhoto, Long> {

}
