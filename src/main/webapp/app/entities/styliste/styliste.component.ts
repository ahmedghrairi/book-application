import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStyliste } from 'app/shared/model/styliste.model';
import { AccountService } from 'app/core';
import { StylisteService } from './styliste.service';

@Component({
    selector: 'jhi-styliste',
    templateUrl: './styliste.component.html'
})
export class StylisteComponent implements OnInit, OnDestroy {
    stylistes: IStyliste[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected stylisteService: StylisteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.stylisteService
            .query()
            .pipe(
                filter((res: HttpResponse<IStyliste[]>) => res.ok),
                map((res: HttpResponse<IStyliste[]>) => res.body)
            )
            .subscribe(
                (res: IStyliste[]) => {
                    this.stylistes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInStylistes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStyliste) {
        return item.id;
    }

    registerChangeInStylistes() {
        this.eventSubscriber = this.eventManager.subscribe('stylisteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
