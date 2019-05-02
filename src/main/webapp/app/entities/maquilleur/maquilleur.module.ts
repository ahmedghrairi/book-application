import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookApplicationSharedModule } from 'app/shared';
import {
    MaquilleurComponent,
    MaquilleurDetailComponent,
    MaquilleurUpdateComponent,
    MaquilleurDeletePopupComponent,
    MaquilleurDeleteDialogComponent,
    maquilleurRoute,
    maquilleurPopupRoute
} from './';

const ENTITY_STATES = [...maquilleurRoute, ...maquilleurPopupRoute];

@NgModule({
    imports: [BookApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MaquilleurComponent,
        MaquilleurDetailComponent,
        MaquilleurUpdateComponent,
        MaquilleurDeleteDialogComponent,
        MaquilleurDeletePopupComponent
    ],
    entryComponents: [MaquilleurComponent, MaquilleurUpdateComponent, MaquilleurDeleteDialogComponent, MaquilleurDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookApplicationMaquilleurModule {}
