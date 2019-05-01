import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IStyliste } from 'app/shared/model/styliste.model';
import { StylisteService } from './styliste.service';

@Component({
    selector: 'jhi-styliste-update',
    templateUrl: './styliste-update.component.html'
})
export class StylisteUpdateComponent implements OnInit {
    styliste: IStyliste;
    isSaving: boolean;

    constructor(protected stylisteService: StylisteService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ styliste }) => {
            this.styliste = styliste;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.styliste.id !== undefined) {
            this.subscribeToSaveResponse(this.stylisteService.update(this.styliste));
        } else {
            this.subscribeToSaveResponse(this.stylisteService.create(this.styliste));
        }
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
