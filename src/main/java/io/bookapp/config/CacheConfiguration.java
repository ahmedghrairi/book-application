package io.bookapp.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.bookapp.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.bookapp.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.bookapp.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.bookapp.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.bookapp.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.bookapp.domain.Modele.class.getName(), jcacheConfiguration);
            cm.createCache(io.bookapp.domain.Modele.class.getName() + ".stylePhotos", jcacheConfiguration);
            cm.createCache(io.bookapp.domain.Photographe.class.getName(), jcacheConfiguration);
            cm.createCache(io.bookapp.domain.Photographe.class.getName() + ".stylePhotos", jcacheConfiguration);
            cm.createCache(io.bookapp.domain.Hotesse.class.getName(), jcacheConfiguration);
            cm.createCache(io.bookapp.domain.Maquilleur.class.getName(), jcacheConfiguration);
            cm.createCache(io.bookapp.domain.Styliste.class.getName(), jcacheConfiguration);
            cm.createCache(io.bookapp.domain.Agence.class.getName(), jcacheConfiguration);
            cm.createCache(io.bookapp.domain.StylePhoto.class.getName(), jcacheConfiguration);
            cm.createCache(io.bookapp.domain.StylePhoto.class.getName() + ".modeles", jcacheConfiguration);
            cm.createCache(io.bookapp.domain.StylePhoto.class.getName() + ".photographes", jcacheConfiguration);
            createCache(cm, io.bookapp.domain.Modele.class.getName());
            createCache(cm, io.bookapp.domain.Modele.class.getName() + ".stylePhotos");
            createCache(cm, io.bookapp.domain.Photographe.class.getName());
            createCache(cm, io.bookapp.domain.Photographe.class.getName() + ".stylePhotos");
            createCache(cm, io.bookapp.domain.Hotesse.class.getName());
            createCache(cm, io.bookapp.domain.Maquilleur.class.getName());
            createCache(cm, io.bookapp.domain.Styliste.class.getName());
            createCache(cm, io.bookapp.domain.Agence.class.getName());
            createCache(cm, io.bookapp.domain.StylePhoto.class.getName());
            createCache(cm, io.bookapp.domain.StylePhoto.class.getName() + ".modeles");
            createCache(cm, io.bookapp.domain.StylePhoto.class.getName() + ".photographes");
            // jhipster-needle-ehcache-add-entry
        };
    }
}
