import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHotesse } from 'app/shared/model/hotesse.model';
import { AccountService } from 'app/core';
import { HotesseService } from './hotesse.service';

@Component({
    selector: 'jhi-hotesse',
    templateUrl: './hotesse.component.html'
})
export class HotesseComponent implements OnInit, OnDestroy {
    hotesses: IHotesse[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected hotesseService: HotesseService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.hotesseService
            .query()
            .pipe(
                filter((res: HttpResponse<IHotesse[]>) => res.ok),
                map((res: HttpResponse<IHotesse[]>) => res.body)
            )
            .subscribe(
                (res: IHotesse[]) => {
                    this.hotesses = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHotesses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHotesse) {
        return item.id;
    }

    registerChangeInHotesses() {
        this.eventSubscriber = this.eventManager.subscribe('hotesseListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
