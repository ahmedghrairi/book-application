import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IModele } from 'app/shared/model/modele.model';
import { ModeleService } from './modele.service';
import { IStylePhoto } from 'app/shared/model/style-photo.model';
import { StylePhotoService } from 'app/entities/style-photo';

@Component({
    selector: 'jhi-modele-update',
    templateUrl: './modele-update.component.html'
})
export class ModeleUpdateComponent implements OnInit {
    modele: IModele;
    isSaving: boolean;

    stylephotos: IStylePhoto[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected modeleService: ModeleService,
        protected stylePhotoService: StylePhotoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ modele }) => {
            this.modele = modele;
        });
        this.stylePhotoService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IStylePhoto[]>) => mayBeOk.ok),
                map((response: HttpResponse<IStylePhoto[]>) => response.body)
            )
            .subscribe((res: IStylePhoto[]) => (this.stylephotos = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.modele.id !== undefined) {
            this.subscribeToSaveResponse(this.modeleService.update(this.modele));
        } else {
            this.subscribeToSaveResponse(this.modeleService.create(this.modele));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IModele>>) {
        result.subscribe((res: HttpResponse<IModele>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStylePhotoById(index: number, item: IStylePhoto) {
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
