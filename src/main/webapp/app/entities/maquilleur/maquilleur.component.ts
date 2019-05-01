import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMaquilleur } from 'app/shared/model/maquilleur.model';
import { AccountService } from 'app/core';
import { MaquilleurService } from './maquilleur.service';

@Component({
    selector: 'jhi-maquilleur',
    templateUrl: './maquilleur.component.html'
})
export class MaquilleurComponent implements OnInit, OnDestroy {
    maquilleurs: IMaquilleur[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected maquilleurService: MaquilleurService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.maquilleurService
            .query()
            .pipe(
                filter((res: HttpResponse<IMaquilleur[]>) => res.ok),
                map((res: HttpResponse<IMaquilleur[]>) => res.body)
            )
            .subscribe(
                (res: IMaquilleur[]) => {
                    this.maquilleurs = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMaquilleurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMaquilleur) {
        return item.id;
    }

    registerChangeInMaquilleurs() {
        this.eventSubscriber = this.eventManager.subscribe('maquilleurListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
