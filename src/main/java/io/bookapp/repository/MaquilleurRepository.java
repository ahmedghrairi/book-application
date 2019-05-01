package io.bookapp.repository;

import io.bookapp.domain.Maquilleur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Maquilleur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaquilleurRepository extends JpaRepository<Maquilleur, Long> {

}
