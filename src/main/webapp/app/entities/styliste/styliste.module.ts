import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookApplicationSharedModule } from 'app/shared';
import {
    StylisteComponent,
    StylisteDetailComponent,
    StylisteUpdateComponent,
    StylisteDeletePopupComponent,
    StylisteDeleteDialogComponent,
    stylisteRoute,
    stylistePopupRoute
} from './';

const ENTITY_STATES = [...stylisteRoute, ...stylistePopupRoute];

@NgModule({
    imports: [BookApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StylisteComponent,
        StylisteDetailComponent,
        StylisteUpdateComponent,
        StylisteDeleteDialogComponent,
        StylisteDeletePopupComponent
    ],
    entryComponents: [StylisteComponent, StylisteUpdateComponent, StylisteDeleteDialogComponent, StylisteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookApplicationStylisteModule {}
