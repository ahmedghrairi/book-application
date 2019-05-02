package io.bookapp.repository;

import io.bookapp.domain.Hotesse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Hotesse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HotesseRepository extends JpaRepository<Hotesse, Long> {

}
