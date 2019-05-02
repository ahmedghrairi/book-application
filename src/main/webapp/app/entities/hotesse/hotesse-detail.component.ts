import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHotesse } from 'app/shared/model/hotesse.model';

@Component({
    selector: 'jhi-hotesse-detail',
    templateUrl: './hotesse-detail.component.html'
})
export class HotesseDetailComponent implements OnInit {
    hotesse: IHotesse;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hotesse }) => {
            this.hotesse = hotesse;
        });
    }

    previousState() {
        window.history.back();
    }
}
