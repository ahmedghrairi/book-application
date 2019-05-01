import { NgModule } from '@angular/core';

import { BookApplicationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [BookApplicationSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [BookApplicationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class BookApplicationSharedCommonModule {}
