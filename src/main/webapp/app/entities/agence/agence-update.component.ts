import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAgence, Agence } from 'app/shared/model/agence.model';
import { AgenceService } from './agence.service';

@Component({
    selector: 'jhi-agence-update',
    templateUrl: './agence-update.component.html'
})
export class AgenceUpdateComponent implements OnInit {
    agence: IAgence;
    isSaving: boolean;

    editForm = this.fb.group({
        id: [],
        raisonSociale: [],
        valider: []
    });

    constructor(protected agenceService: AgenceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ agence }) => {
            this.updateForm(agence);
            this.agence = agence;
        });
    }

    updateForm(agence: IAgence) {
        this.editForm.patchValue({
            id: agence.id,
            raisonSociale: agence.raisonSociale,
            valider: agence.valider
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const agence = this.createFromForm();
        if (agence.id !== undefined) {
            this.subscribeToSaveResponse(this.agenceService.update(agence));
        } else {
            this.subscribeToSaveResponse(this.agenceService.create(agence));
        }
    }

    private createFromForm(): IAgence {
        const entity = {
            ...new Agence(),
            id: this.editForm.get(['id']).value,
            raisonSociale: this.editForm.get(['raisonSociale']).value,
            valider: this.editForm.get(['valider']).value
        };
        return entity;
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgence>>) {
        result.subscribe((res: HttpResponse<IAgence>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
