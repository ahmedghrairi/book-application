import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IStyliste, Styliste } from 'app/shared/model/styliste.model';
import { StylisteService } from './styliste.service';

@Component({
    selector: 'jhi-styliste-update',
    templateUrl: './styliste-update.component.html'
})
export class StylisteUpdateComponent implements OnInit {
    styliste: IStyliste;
    isSaving: boolean;

    editForm = this.fb.group({
        id: [],
        experience: []
    });

    constructor(protected stylisteService: StylisteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ styliste }) => {
            this.updateForm(styliste);
            this.styliste = styliste;
        });
    }

    updateForm(styliste: IStyliste) {
        this.editForm.patchValue({
            id: styliste.id,
            experience: styliste.experience
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const styliste = this.createFromForm();
        if (styliste.id !== undefined) {
            this.subscribeToSaveResponse(this.stylisteService.update(styliste));
        } else {
            this.subscribeToSaveResponse(this.stylisteService.create(styliste));
        }
    }

    private createFromForm(): IStyliste {
        const entity = {
            ...new Styliste(),
            id: this.editForm.get(['id']).value,
            experience: this.editForm.get(['experience']).value
        };
        return entity;
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStyliste>>) {
        result.subscribe((res: HttpResponse<IStyliste>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
