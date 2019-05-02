import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookApplicationSharedModule } from 'app/shared';
import {
    HotesseComponent,
    HotesseDetailComponent,
    HotesseUpdateComponent,
    HotesseDeletePopupComponent,
    HotesseDeleteDialogComponent,
    hotesseRoute,
    hotessePopupRoute
} from './';

const ENTITY_STATES = [...hotesseRoute, ...hotessePopupRoute];

@NgModule({
    imports: [BookApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HotesseComponent,
        HotesseDetailComponent,
        HotesseUpdateComponent,
        HotesseDeleteDialogComponent,
        HotesseDeletePopupComponent
    ],
    entryComponents: [HotesseComponent, HotesseUpdateComponent, HotesseDeleteDialogComponent, HotesseDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookApplicationHotesseModule {}
