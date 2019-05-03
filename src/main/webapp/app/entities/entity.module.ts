import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'modele',
                loadChildren: './modele/modele.module#BookApplicationModeleModule'
            },
            {
                path: 'photographe',
                loadChildren: './photographe/photographe.module#BookApplicationPhotographeModule'
            },
            {
                path: 'hotesse',
                loadChildren: './hotesse/hotesse.module#BookApplicationHotesseModule'
            },
            {
                path: 'maquilleur',
                loadChildren: './maquilleur/maquilleur.module#BookApplicationMaquilleurModule'
            },
            {
                path: 'styliste',
                loadChildren: './styliste/styliste.module#BookApplicationStylisteModule'
            },
            {
                path: 'agence',
                loadChildren: './agence/agence.module#BookApplicationAgenceModule'
            },
            {
                path: 'style-photo',
                loadChildren: './style-photo/style-photo.module#BookApplicationStylePhotoModule'
            },
            {
                path: 'modele',
                loadChildren: './modele/modele.module#BookApplicationModeleModule'
            },
            {
                path: 'photographe',
                loadChildren: './photographe/photographe.module#BookApplicationPhotographeModule'
            },
            {
                path: 'hotesse',
                loadChildren: './hotesse/hotesse.module#BookApplicationHotesseModule'
            },
            {
                path: 'maquilleur',
                loadChildren: './maquilleur/maquilleur.module#BookApplicationMaquilleurModule'
            },
            {
                path: 'styliste',
                loadChildren: './styliste/styliste.module#BookApplicationStylisteModule'
            },
            {
                path: 'agence',
                loadChildren: './agence/agence.module#BookApplicationAgenceModule'
            },
            {
                path: 'style-photo',
                loadChildren: './style-photo/style-photo.module#BookApplicationStylePhotoModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookApplicationEntityModule {}
