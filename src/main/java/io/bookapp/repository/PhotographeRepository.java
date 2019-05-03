package io.bookapp.repository;

import io.bookapp.domain.Photographe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Photographe entity.
 */
@Repository
public interface PhotographeRepository extends JpaRepository<Photographe, Long> {

    @Query(value = "select distinct photographe from Photographe photographe left join fetch photographe.stylePhotos",
        countQuery = "select count(distinct photographe) from Photographe photographe")
    Page<Photographe> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct photographe from Photographe photographe left join fetch photographe.stylePhotos")
    List<Photographe> findAllWithEagerRelationships();

    @Query("select photographe from Photographe photographe left join fetch photographe.stylePhotos where photographe.id =:id")
    Optional<Photographe> findOneWithEagerRelationships(@Param("id") Long id);

}
