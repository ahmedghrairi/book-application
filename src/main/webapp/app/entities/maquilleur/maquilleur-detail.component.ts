import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMaquilleur } from 'app/shared/model/maquilleur.model';

@Component({
    selector: 'jhi-maquilleur-detail',
    templateUrl: './maquilleur-detail.component.html'
})
export class MaquilleurDetailComponent implements OnInit {
    maquilleur: IMaquilleur;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ maquilleur }) => {
            this.maquilleur = maquilleur;
        });
    }

    previousState() {
        window.history.back();
    }
}
