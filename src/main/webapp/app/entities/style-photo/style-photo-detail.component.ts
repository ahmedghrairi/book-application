import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStylePhoto } from 'app/shared/model/style-photo.model';

@Component({
    selector: 'jhi-style-photo-detail',
    templateUrl: './style-photo-detail.component.html'
})
export class StylePhotoDetailComponent implements OnInit {
    stylePhoto: IStylePhoto;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stylePhoto }) => {
            this.stylePhoto = stylePhoto;
        });
    }

    previousState() {
        window.history.back();
    }
}
