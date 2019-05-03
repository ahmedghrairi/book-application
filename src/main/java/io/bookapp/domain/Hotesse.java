package io.bookapp.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import io.bookapp.domain.enumeration.Experience;

import io.bookapp.domain.enumeration.TypeHotesse;

import io.bookapp.domain.enumeration.Disponibilite;

/**
 * A Hotesse.
 */
@Entity
@Table(name = "hotesse")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Hotesse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "taille")
    private Long taille;

    @Column(name = "poids")
    private Long poids;

    @Enumerated(EnumType.STRING)
    @Column(name = "experience")
    private Experience experience;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private TypeHotesse type;

    @Column(name = "deplacement")
    private Boolean deplacement;

    @Enumerated(EnumType.STRING)
    @Column(name = "disponibilite")
    private Disponibilite disponibilite;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTaille() {
        return taille;
    }

    public Hotesse taille(Long taille) {
        this.taille = taille;
        return this;
    }

    public void setTaille(Long taille) {
        this.taille = taille;
    }

    public Long getPoids() {
        return poids;
    }

    public Hotesse poids(Long poids) {
        this.poids = poids;
        return this;
    }

    public void setPoids(Long poids) {
        this.poids = poids;
    }

    public Experience getExperience() {
        return experience;
    }

    public Hotesse experience(Experience experience) {
        this.experience = experience;
        return this;
    }

    public void setExperience(Experience experience) {
        this.experience = experience;
    }

    public TypeHotesse getType() {
        return type;
    }

    public Hotesse type(TypeHotesse type) {
        this.type = type;
        return this;
    }

    public void setType(TypeHotesse type) {
        this.type = type;
    }

    public Boolean isDeplacement() {
        return deplacement;
    }

    public Hotesse deplacement(Boolean deplacement) {
        this.deplacement = deplacement;
        return this;
    }

    public void setDeplacement(Boolean deplacement) {
        this.deplacement = deplacement;
    }

    public Disponibilite getDisponibilite() {
        return disponibilite;
    }

    public Hotesse disponibilite(Disponibilite disponibilite) {
        this.disponibilite = disponibilite;
        return this;
    }

    public void setDisponibilite(Disponibilite disponibilite) {
        this.disponibilite = disponibilite;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Hotesse)) {
            return false;
        }
        return id != null && id.equals(((Hotesse) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Hotesse{" +
            "id=" + getId() +
            ", taille=" + getTaille() +
            ", poids=" + getPoids() +
            ", experience='" + getExperience() + "'" +
            ", type='" + getType() + "'" +
            ", deplacement='" + isDeplacement() + "'" +
            ", disponibilite='" + getDisponibilite() + "'" +
            "}";
    }
}
