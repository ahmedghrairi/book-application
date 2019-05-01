import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookApplicationSharedModule } from 'app/shared';
import {
    StylePhotoComponent,
    StylePhotoDetailComponent,
    StylePhotoUpdateComponent,
    StylePhotoDeletePopupComponent,
    StylePhotoDeleteDialogComponent,
    stylePhotoRoute,
    stylePhotoPopupRoute
} from './';

const ENTITY_STATES = [...stylePhotoRoute, ...stylePhotoPopupRoute];

@NgModule({
    imports: [BookApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StylePhotoComponent,
        StylePhotoDetailComponent,
        StylePhotoUpdateComponent,
        StylePhotoDeleteDialogComponent,
        StylePhotoDeletePopupComponent
    ],
    entryComponents: [StylePhotoComponent, StylePhotoUpdateComponent, StylePhotoDeleteDialogComponent, StylePhotoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookApplicationStylePhotoModule {}
