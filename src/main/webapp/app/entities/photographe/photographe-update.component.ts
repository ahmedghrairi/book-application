import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPhotographe } from 'app/shared/model/photographe.model';
import { PhotographeService } from './photographe.service';
import { IStylePhoto } from 'app/shared/model/style-photo.model';
import { StylePhotoService } from 'app/entities/style-photo';

@Component({
    selector: 'jhi-photographe-update',
    templateUrl: './photographe-update.component.html'
})
export class PhotographeUpdateComponent implements OnInit {
    photographe: IPhotographe;
    isSaving: boolean;

    stylephotos: IStylePhoto[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected photographeService: PhotographeService,
        protected stylePhotoService: StylePhotoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ photographe }) => {
            this.photographe = photographe;
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
        if (this.photographe.id !== undefined) {
            this.subscribeToSaveResponse(this.photographeService.update(this.photographe));
        } else {
            this.subscribeToSaveResponse(this.photographeService.create(this.photographe));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPhotographe>>) {
        result.subscribe((res: HttpResponse<IPhotographe>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
