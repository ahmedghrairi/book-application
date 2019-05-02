package io.bookapp.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.bookapp.domain.enumeration.CouleurYeux;

import io.bookapp.domain.enumeration.CouleurCheveux;

import io.bookapp.domain.enumeration.Experience;

import io.bookapp.domain.enumeration.TypeModele;

/**
 * A Modele.
 */
@Entity
@Table(name = "modele")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Modele implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "taille")
    private Long taille;

    @Column(name = "poids")
    private Long poids;

    @Column(name = "pointure")
    private Long pointure;

    @Column(name = "taille_poitrine")
    private Long taillePoitrine;

    @Column(name = "tour_de_taille")
    private Long tourDeTaille;

    @Column(name = "tour_de_hanche")
    private Long tourDeHanche;

    @Enumerated(EnumType.STRING)
    @Column(name = "couleur_des_yeux")
    private CouleurYeux couleurDesYeux;

    @Enumerated(EnumType.STRING)
    @Column(name = "couleur_de_cheveux")
    private CouleurCheveux couleurDeCheveux;

    @Enumerated(EnumType.STRING)
    @Column(name = "experience")
    private Experience experience;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private TypeModele type;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "modele_style_photo",
               joinColumns = @JoinColumn(name = "modele_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "style_photo_id", referencedColumnName = "id"))
    private Set<StylePhoto> stylePhotos = new HashSet<>();

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

    public Modele taille(Long taille) {
        this.taille = taille;
        return this;
    }

    public void setTaille(Long taille) {
        this.taille = taille;
    }

    public Long getPoids() {
        return poids;
    }

    public Modele poids(Long poids) {
        this.poids = poids;
        return this;
    }

    public void setPoids(Long poids) {
        this.poids = poids;
    }

    public Long getPointure() {
        return pointure;
    }

    public Modele pointure(Long pointure) {
        this.pointure = pointure;
        return this;
    }

    public void setPointure(Long pointure) {
        this.pointure = pointure;
    }

    public Long getTaillePoitrine() {
        return taillePoitrine;
    }

    public Modele taillePoitrine(Long taillePoitrine) {
        this.taillePoitrine = taillePoitrine;
        return this;
    }

    public void setTaillePoitrine(Long taillePoitrine) {
        this.taillePoitrine = taillePoitrine;
    }

    public Long getTourDeTaille() {
        return tourDeTaille;
    }

    public Modele tourDeTaille(Long tourDeTaille) {
        this.tourDeTaille = tourDeTaille;
        return this;
    }

    public void setTourDeTaille(Long tourDeTaille) {
        this.tourDeTaille = tourDeTaille;
    }

    public Long getTourDeHanche() {
        return tourDeHanche;
    }

    public Modele tourDeHanche(Long tourDeHanche) {
        this.tourDeHanche = tourDeHanche;
        return this;
    }

    public void setTourDeHanche(Long tourDeHanche) {
        this.tourDeHanche = tourDeHanche;
    }

    public CouleurYeux getCouleurDesYeux() {
        return couleurDesYeux;
    }

    public Modele couleurDesYeux(CouleurYeux couleurDesYeux) {
        this.couleurDesYeux = couleurDesYeux;
        return this;
    }

    public void setCouleurDesYeux(CouleurYeux couleurDesYeux) {
        this.couleurDesYeux = couleurDesYeux;
    }

    public CouleurCheveux getCouleurDeCheveux() {
        return couleurDeCheveux;
    }

    public Modele couleurDeCheveux(CouleurCheveux couleurDeCheveux) {
        this.couleurDeCheveux = couleurDeCheveux;
        return this;
    }

    public void setCouleurDeCheveux(CouleurCheveux couleurDeCheveux) {
        this.couleurDeCheveux = couleurDeCheveux;
    }

    public Experience getExperience() {
        return experience;
    }

    public Modele experience(Experience experience) {
        this.experience = experience;
        return this;
    }

    public void setExperience(Experience experience) {
        this.experience = experience;
    }

    public TypeModele getType() {
        return type;
    }

    public Modele type(TypeModele type) {
        this.type = type;
        return this;
    }

    public void setType(TypeModele type) {
        this.type = type;
    }

    public Set<StylePhoto> getStylePhotos() {
        return stylePhotos;
    }

    public Modele stylePhotos(Set<StylePhoto> stylePhotos) {
        this.stylePhotos = stylePhotos;
        return this;
    }

    public Modele addStylePhoto(StylePhoto stylePhoto) {
        this.stylePhotos.add(stylePhoto);
        stylePhoto.getModeles().add(this);
        return this;
    }

    public Modele removeStylePhoto(StylePhoto stylePhoto) {
        this.stylePhotos.remove(stylePhoto);
        stylePhoto.getModeles().remove(this);
        return this;
    }

    public void setStylePhotos(Set<StylePhoto> stylePhotos) {
        this.stylePhotos = stylePhotos;
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
        Modele modele = (Modele) o;
        if (modele.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), modele.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Modele{" +
            "id=" + getId() +
            ", taille=" + getTaille() +
            ", poids=" + getPoids() +
            ", pointure=" + getPointure() +
            ", taillePoitrine=" + getTaillePoitrine() +
            ", tourDeTaille=" + getTourDeTaille() +
            ", tourDeHanche=" + getTourDeHanche() +
            ", couleurDesYeux='" + getCouleurDesYeux() + "'" +
            ", couleurDeCheveux='" + getCouleurDeCheveux() + "'" +
            ", experience='" + getExperience() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
