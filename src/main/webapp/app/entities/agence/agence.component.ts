import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAgence } from 'app/shared/model/agence.model';
import { AccountService } from 'app/core';
import { AgenceService } from './agence.service';

@Component({
    selector: 'jhi-agence',
    templateUrl: './agence.component.html'
})
export class AgenceComponent implements OnInit, OnDestroy {
    agences: IAgence[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected agenceService: AgenceService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.agenceService
            .query()
            .pipe(
                filter((res: HttpResponse<IAgence[]>) => res.ok),
                map((res: HttpResponse<IAgence[]>) => res.body)
            )
            .subscribe(
                (res: IAgence[]) => {
                    this.agences = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAgences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAgence) {
        return item.id;
    }

    registerChangeInAgences() {
        this.eventSubscriber = this.eventManager.subscribe('agenceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
