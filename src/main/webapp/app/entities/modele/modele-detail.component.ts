import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IModele } from 'app/shared/model/modele.model';

@Component({
    selector: 'jhi-modele-detail',
    templateUrl: './modele-detail.component.html'
})
export class ModeleDetailComponent implements OnInit {
    modele: IModele;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ modele }) => {
            this.modele = modele;
        });
    }

    previousState() {
        window.history.back();
    }
}
