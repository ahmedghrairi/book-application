package io.bookapp.repository;

import io.bookapp.domain.Styliste;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Styliste entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StylisteRepository extends JpaRepository<Styliste, Long> {

}
