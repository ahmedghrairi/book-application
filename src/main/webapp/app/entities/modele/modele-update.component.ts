import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IModele, Modele } from 'app/shared/model/modele.model';
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

    editForm = this.fb.group({
        id: [],
        taille: [],
        poids: [],
        pointure: [],
        taillePoitrine: [],
        tourDeTaille: [],
        tourDeHanche: [],
        couleurDesYeux: [],
        couleurDeCheveux: [],
        experience: [],
        type: [],
        photo: [],
        photoContentType: [],
        stylePhotos: []
    });

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected modeleService: ModeleService,
        protected stylePhotoService: StylePhotoService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ modele }) => {
            this.updateForm(modele);
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

    updateForm(modele: IModele) {
        this.editForm.patchValue({
            id: modele.id,
            taille: modele.taille,
            poids: modele.poids,
            pointure: modele.pointure,
            taillePoitrine: modele.taillePoitrine,
            tourDeTaille: modele.tourDeTaille,
            tourDeHanche: modele.tourDeHanche,
            couleurDesYeux: modele.couleurDesYeux,
            couleurDeCheveux: modele.couleurDeCheveux,
            experience: modele.experience,
            type: modele.type,
            photo: modele.photo,
            photoContentType: modele.photoContentType,
            stylePhotos: modele.stylePhotos
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, field: string, isImage) {
        return new Promise((resolve, reject) => {
            if (event && event.target && event.target.files && event.target.files[0]) {
                const file = event.target.files[0];
                if (isImage && !/^image\//.test(file.type)) {
                    reject(`File was expected to be an image but was found to be ${file.type}`);
                } else {
                    const filedContentType: string = field + 'ContentType';
                    this.dataUtils.toBase64(file, base64Data => {
                        this.editForm.patchValue({
                            [field]: base64Data,
                            [filedContentType]: file.type
                        });
                    });
                }
            } else {
                reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
            }
        }).then(
            () => console.log('blob added'), // sucess
            this.onError
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const modele = this.createFromForm();
        if (modele.id !== undefined) {
            this.subscribeToSaveResponse(this.modeleService.update(modele));
        } else {
            this.subscribeToSaveResponse(this.modeleService.create(modele));
        }
    }

    private createFromForm(): IModele {
        const entity = {
            ...new Modele(),
            id: this.editForm.get(['id']).value,
            taille: this.editForm.get(['taille']).value,
            poids: this.editForm.get(['poids']).value,
            pointure: this.editForm.get(['pointure']).value,
            taillePoitrine: this.editForm.get(['taillePoitrine']).value,
            tourDeTaille: this.editForm.get(['tourDeTaille']).value,
            tourDeHanche: this.editForm.get(['tourDeHanche']).value,
            couleurDesYeux: this.editForm.get(['couleurDesYeux']).value,
            couleurDeCheveux: this.editForm.get(['couleurDeCheveux']).value,
            experience: this.editForm.get(['experience']).value,
            type: this.editForm.get(['type']).value,
            photoContentType: this.editForm.get(['photoContentType']).value,
            photo: this.editForm.get(['photo']).value,
            stylePhotos: this.editForm.get(['stylePhotos']).value
        };
        return entity;
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
