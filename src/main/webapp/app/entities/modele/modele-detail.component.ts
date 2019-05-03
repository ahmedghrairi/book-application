import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IModele } from 'app/shared/model/modele.model';

@Component({
    selector: 'jhi-modele-detail',
    templateUrl: './modele-detail.component.html'
})
export class ModeleDetailComponent implements OnInit {
    modele: IModele;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ modele }) => {
            this.modele = modele;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
