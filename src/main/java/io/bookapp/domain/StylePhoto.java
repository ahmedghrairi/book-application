package io.bookapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A StylePhoto.
 */
@Entity
@Table(name = "style_photo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class StylePhoto implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @ManyToMany(mappedBy = "stylePhotos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Modele> modeles = new HashSet<>();

    @ManyToMany(mappedBy = "stylePhotos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Photographe> photographes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public StylePhoto nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Set<Modele> getModeles() {
        return modeles;
    }

    public StylePhoto modeles(Set<Modele> modeles) {
        this.modeles = modeles;
        return this;
    }

    public StylePhoto addModele(Modele modele) {
        this.modeles.add(modele);
        modele.getStylePhotos().add(this);
        return this;
    }

    public StylePhoto removeModele(Modele modele) {
        this.modeles.remove(modele);
        modele.getStylePhotos().remove(this);
        return this;
    }

    public void setModeles(Set<Modele> modeles) {
        this.modeles = modeles;
    }

    public Set<Photographe> getPhotographes() {
        return photographes;
    }

    public StylePhoto photographes(Set<Photographe> photographes) {
        this.photographes = photographes;
        return this;
    }

    public StylePhoto addPhotographe(Photographe photographe) {
        this.photographes.add(photographe);
        photographe.getStylePhotos().add(this);
        return this;
    }

    public StylePhoto removePhotographe(Photographe photographe) {
        this.photographes.remove(photographe);
        photographe.getStylePhotos().remove(this);
        return this;
    }

    public void setPhotographes(Set<Photographe> photographes) {
        this.photographes = photographes;
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
        StylePhoto stylePhoto = (StylePhoto) o;
        if (stylePhoto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stylePhoto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StylePhoto{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}
