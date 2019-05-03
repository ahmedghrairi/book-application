import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IHotesse, Hotesse } from 'app/shared/model/hotesse.model';
import { HotesseService } from './hotesse.service';

@Component({
    selector: 'jhi-hotesse-update',
    templateUrl: './hotesse-update.component.html'
})
export class HotesseUpdateComponent implements OnInit {
    hotesse: IHotesse;
    isSaving: boolean;

    editForm = this.fb.group({
        id: [],
        taille: [],
        poids: [],
        experience: [],
        type: [],
        deplacement: [],
        disponibilite: []
    });

    constructor(protected hotesseService: HotesseService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hotesse }) => {
            this.updateForm(hotesse);
            this.hotesse = hotesse;
        });
    }

    updateForm(hotesse: IHotesse) {
        this.editForm.patchValue({
            id: hotesse.id,
            taille: hotesse.taille,
            poids: hotesse.poids,
            experience: hotesse.experience,
            type: hotesse.type,
            deplacement: hotesse.deplacement,
            disponibilite: hotesse.disponibilite
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const hotesse = this.createFromForm();
        if (hotesse.id !== undefined) {
            this.subscribeToSaveResponse(this.hotesseService.update(hotesse));
        } else {
            this.subscribeToSaveResponse(this.hotesseService.create(hotesse));
        }
    }

    private createFromForm(): IHotesse {
        const entity = {
            ...new Hotesse(),
            id: this.editForm.get(['id']).value,
            taille: this.editForm.get(['taille']).value,
            poids: this.editForm.get(['poids']).value,
            experience: this.editForm.get(['experience']).value,
            type: this.editForm.get(['type']).value,
            deplacement: this.editForm.get(['deplacement']).value,
            disponibilite: this.editForm.get(['disponibilite']).value
        };
        return entity;
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHotesse>>) {
        result.subscribe((res: HttpResponse<IHotesse>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
