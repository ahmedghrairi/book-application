import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMaquilleur, Maquilleur } from 'app/shared/model/maquilleur.model';
import { MaquilleurService } from './maquilleur.service';

@Component({
    selector: 'jhi-maquilleur-update',
    templateUrl: './maquilleur-update.component.html'
})
export class MaquilleurUpdateComponent implements OnInit {
    maquilleur: IMaquilleur;
    isSaving: boolean;

    editForm = this.fb.group({
        id: [],
        experience: []
    });

    constructor(protected maquilleurService: MaquilleurService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ maquilleur }) => {
            this.updateForm(maquilleur);
            this.maquilleur = maquilleur;
        });
    }

    updateForm(maquilleur: IMaquilleur) {
        this.editForm.patchValue({
            id: maquilleur.id,
            experience: maquilleur.experience
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const maquilleur = this.createFromForm();
        if (maquilleur.id !== undefined) {
            this.subscribeToSaveResponse(this.maquilleurService.update(maquilleur));
        } else {
            this.subscribeToSaveResponse(this.maquilleurService.create(maquilleur));
        }
    }

    private createFromForm(): IMaquilleur {
        const entity = {
            ...new Maquilleur(),
            id: this.editForm.get(['id']).value,
            experience: this.editForm.get(['experience']).value
        };
        return entity;
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaquilleur>>) {
        result.subscribe((res: HttpResponse<IMaquilleur>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
