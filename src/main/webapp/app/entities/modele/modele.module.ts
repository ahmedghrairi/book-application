import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookApplicationSharedModule } from 'app/shared';
import {
    ModeleComponent,
    ModeleDetailComponent,
    ModeleUpdateComponent,
    ModeleDeletePopupComponent,
    ModeleDeleteDialogComponent,
    modeleRoute,
    modelePopupRoute
} from './';

const ENTITY_STATES = [...modeleRoute, ...modelePopupRoute];

@NgModule({
    imports: [BookApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ModeleComponent, ModeleDetailComponent, ModeleUpdateComponent, ModeleDeleteDialogComponent, ModeleDeletePopupComponent],
    entryComponents: [ModeleComponent, ModeleUpdateComponent, ModeleDeleteDialogComponent, ModeleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookApplicationModeleModule {}
