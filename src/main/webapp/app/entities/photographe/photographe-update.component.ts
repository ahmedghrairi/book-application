import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPhotographe, Photographe } from 'app/shared/model/photographe.model';
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

    editForm = this.fb.group({
        id: [],
        experience: [],
        stylePhotos: []
    });

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected photographeService: PhotographeService,
        protected stylePhotoService: StylePhotoService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ photographe }) => {
            this.updateForm(photographe);
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

    updateForm(photographe: IPhotographe) {
        this.editForm.patchValue({
            id: photographe.id,
            experience: photographe.experience,
            stylePhotos: photographe.stylePhotos
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const photographe = this.createFromForm();
        if (photographe.id !== undefined) {
            this.subscribeToSaveResponse(this.photographeService.update(photographe));
        } else {
            this.subscribeToSaveResponse(this.photographeService.create(photographe));
        }
    }

    private createFromForm(): IPhotographe {
        const entity = {
            ...new Photographe(),
            id: this.editForm.get(['id']).value,
            experience: this.editForm.get(['experience']).value,
            stylePhotos: this.editForm.get(['stylePhotos']).value
        };
        return entity;
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
