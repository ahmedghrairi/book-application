import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStyliste } from 'app/shared/model/styliste.model';

@Component({
    selector: 'jhi-styliste-detail',
    templateUrl: './styliste-detail.component.html'
})
export class StylisteDetailComponent implements OnInit {
    styliste: IStyliste;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ styliste }) => {
            this.styliste = styliste;
        });
    }

    previousState() {
        window.history.back();
    }
}
