import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStylePhoto } from 'app/shared/model/style-photo.model';
import { StylePhotoService } from './style-photo.service';
import { IModele } from 'app/shared/model/modele.model';
import { ModeleService } from 'app/entities/modele';
import { IPhotographe } from 'app/shared/model/photographe.model';
import { PhotographeService } from 'app/entities/photographe';

@Component({
    selector: 'jhi-style-photo-update',
    templateUrl: './style-photo-update.component.html'
})
export class StylePhotoUpdateComponent implements OnInit {
    stylePhoto: IStylePhoto;
    isSaving: boolean;

    modeles: IModele[];

    photographes: IPhotographe[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected stylePhotoService: StylePhotoService,
        protected modeleService: ModeleService,
        protected photographeService: PhotographeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stylePhoto }) => {
            this.stylePhoto = stylePhoto;
        });
        this.modeleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IModele[]>) => mayBeOk.ok),
                map((response: HttpResponse<IModele[]>) => response.body)
            )
            .subscribe((res: IModele[]) => (this.modeles = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.photographeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPhotographe[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPhotographe[]>) => response.body)
            )
            .subscribe((res: IPhotographe[]) => (this.photographes = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.stylePhoto.id !== undefined) {
            this.subscribeToSaveResponse(this.stylePhotoService.update(this.stylePhoto));
        } else {
            this.subscribeToSaveResponse(this.stylePhotoService.create(this.stylePhoto));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStylePhoto>>) {
        result.subscribe((res: HttpResponse<IStylePhoto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackModeleById(index: number, item: IModele) {
        return item.id;
    }

    trackPhotographeById(index: number, item: IPhotographe) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
