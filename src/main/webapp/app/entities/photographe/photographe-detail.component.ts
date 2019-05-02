import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPhotographe } from 'app/shared/model/photographe.model';

@Component({
    selector: 'jhi-photographe-detail',
    templateUrl: './photographe-detail.component.html'
})
export class PhotographeDetailComponent implements OnInit {
    photographe: IPhotographe;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ photographe }) => {
            this.photographe = photographe;
        });
    }

    previousState() {
        window.history.back();
    }
}
