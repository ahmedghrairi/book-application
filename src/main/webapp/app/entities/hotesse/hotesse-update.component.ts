import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IHotesse } from 'app/shared/model/hotesse.model';
import { HotesseService } from './hotesse.service';

@Component({
    selector: 'jhi-hotesse-update',
    templateUrl: './hotesse-update.component.html'
})
export class HotesseUpdateComponent implements OnInit {
    hotesse: IHotesse;
    isSaving: boolean;

    constructor(protected hotesseService: HotesseService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hotesse }) => {
            this.hotesse = hotesse;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.hotesse.id !== undefined) {
            this.subscribeToSaveResponse(this.hotesseService.update(this.hotesse));
        } else {
            this.subscribeToSaveResponse(this.hotesseService.create(this.hotesse));
        }
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
