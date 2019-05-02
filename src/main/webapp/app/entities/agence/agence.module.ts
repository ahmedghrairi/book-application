import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookApplicationSharedModule } from 'app/shared';
import {
    AgenceComponent,
    AgenceDetailComponent,
    AgenceUpdateComponent,
    AgenceDeletePopupComponent,
    AgenceDeleteDialogComponent,
    agenceRoute,
    agencePopupRoute
} from './';

const ENTITY_STATES = [...agenceRoute, ...agencePopupRoute];

@NgModule({
    imports: [BookApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AgenceComponent, AgenceDetailComponent, AgenceUpdateComponent, AgenceDeleteDialogComponent, AgenceDeletePopupComponent],
    entryComponents: [AgenceComponent, AgenceUpdateComponent, AgenceDeleteDialogComponent, AgenceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookApplicationAgenceModule {}
