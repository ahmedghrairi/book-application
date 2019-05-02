import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStylePhoto } from 'app/shared/model/style-photo.model';
import { AccountService } from 'app/core';
import { StylePhotoService } from './style-photo.service';

@Component({
    selector: 'jhi-style-photo',
    templateUrl: './style-photo.component.html'
})
export class StylePhotoComponent implements OnInit, OnDestroy {
    stylePhotos: IStylePhoto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected stylePhotoService: StylePhotoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.stylePhotoService
            .query()
            .pipe(
                filter((res: HttpResponse<IStylePhoto[]>) => res.ok),
                map((res: HttpResponse<IStylePhoto[]>) => res.body)
            )
            .subscribe(
                (res: IStylePhoto[]) => {
                    this.stylePhotos = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInStylePhotos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStylePhoto) {
        return item.id;
    }

    registerChangeInStylePhotos() {
        this.eventSubscriber = this.eventManager.subscribe('stylePhotoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
