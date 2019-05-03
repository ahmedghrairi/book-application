package io.bookapp.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.bookapp.domain.enumeration.Experience;

/**
 * A Photographe.
 */
@Entity
@Table(name = "photographe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Photographe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "experience")
    private Experience experience;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "photographe_style_photo",
               joinColumns = @JoinColumn(name = "photographe_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "style_photo_id", referencedColumnName = "id"))
    private Set<StylePhoto> stylePhotos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Experience getExperience() {
        return experience;
    }

    public Photographe experience(Experience experience) {
        this.experience = experience;
        return this;
    }

    public void setExperience(Experience experience) {
        this.experience = experience;
    }

    public Set<StylePhoto> getStylePhotos() {
        return stylePhotos;
    }

    public Photographe stylePhotos(Set<StylePhoto> stylePhotos) {
        this.stylePhotos = stylePhotos;
        return this;
    }

    public Photographe addStylePhoto(StylePhoto stylePhoto) {
        this.stylePhotos.add(stylePhoto);
        stylePhoto.getPhotographes().add(this);
        return this;
    }

    public Photographe removeStylePhoto(StylePhoto stylePhoto) {
        this.stylePhotos.remove(stylePhoto);
        stylePhoto.getPhotographes().remove(this);
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
        if (!(o instanceof Photographe)) {
            return false;
        }
        return id != null && id.equals(((Photographe) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Photographe{" +
            "id=" + getId() +
            ", experience='" + getExperience() + "'" +
            "}";
    }
}
