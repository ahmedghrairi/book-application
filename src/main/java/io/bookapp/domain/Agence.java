package io.bookapp.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Agence.
 */
@Entity
@Table(name = "agence")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Agence implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "raison_sociale")
    private String raisonSociale;

    @Column(name = "valider")
    private Boolean valider;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRaisonSociale() {
        return raisonSociale;
    }

    public Agence raisonSociale(String raisonSociale) {
        this.raisonSociale = raisonSociale;
        return this;
    }

    public void setRaisonSociale(String raisonSociale) {
        this.raisonSociale = raisonSociale;
    }

    public Boolean isValider() {
        return valider;
    }

    public Agence valider(Boolean valider) {
        this.valider = valider;
        return this;
    }

    public void setValider(Boolean valider) {
        this.valider = valider;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Agence agence = (Agence) o;
        if (agence.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agence.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Agence{" +
            "id=" + getId() +
            ", raisonSociale='" + getRaisonSociale() + "'" +
            ", valider='" + isValider() + "'" +
            "}";
    }
}
