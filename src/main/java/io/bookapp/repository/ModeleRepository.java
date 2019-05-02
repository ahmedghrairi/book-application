package io.bookapp.repository;

import io.bookapp.domain.Modele;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Modele entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModeleRepository extends JpaRepository<Modele, Long> {

    @Query(value = "select distinct modele from Modele modele left join fetch modele.stylePhotos",
        countQuery = "select count(distinct modele) from Modele modele")
    Page<Modele> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct modele from Modele modele left join fetch modele.stylePhotos")
    List<Modele> findAllWithEagerRelationships();

    @Query("select modele from Modele modele left join fetch modele.stylePhotos where modele.id =:id")
    Optional<Modele> findOneWithEagerRelationships(@Param("id") Long id);

}
