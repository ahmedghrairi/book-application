import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IMaquilleur } from 'app/shared/model/maquilleur.model';
import { MaquilleurService } from './maquilleur.service';

@Component({
    selector: 'jhi-maquilleur-update',
    templateUrl: './maquilleur-update.component.html'
})
export class MaquilleurUpdateComponent implements OnInit {
    maquilleur: IMaquilleur;
    isSaving: boolean;

    constructor(protected maquilleurService: MaquilleurService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ maquilleur }) => {
            this.maquilleur = maquilleur;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.maquilleur.id !== undefined) {
            this.subscribeToSaveResponse(this.maquilleurService.update(this.maquilleur));
        } else {
            this.subscribeToSaveResponse(this.maquilleurService.create(this.maquilleur));
        }
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
