import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookApplicationSharedModule } from 'app/shared';
import {
    PhotographeComponent,
    PhotographeDetailComponent,
    PhotographeUpdateComponent,
    PhotographeDeletePopupComponent,
    PhotographeDeleteDialogComponent,
    photographeRoute,
    photographePopupRoute
} from './';

const ENTITY_STATES = [...photographeRoute, ...photographePopupRoute];

@NgModule({
    imports: [BookApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PhotographeComponent,
        PhotographeDetailComponent,
        PhotographeUpdateComponent,
        PhotographeDeleteDialogComponent,
        PhotographeDeletePopupComponent
    ],
    entryComponents: [PhotographeComponent, PhotographeUpdateComponent, PhotographeDeleteDialogComponent, PhotographeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookApplicationPhotographeModule {}
