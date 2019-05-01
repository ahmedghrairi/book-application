import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IModele } from 'app/shared/model/modele.model';
import { AccountService } from 'app/core';
import { ModeleService } from './modele.service';

@Component({
    selector: 'jhi-modele',
    templateUrl: './modele.component.html'
})
export class ModeleComponent implements OnInit, OnDestroy {
    modeles: IModele[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected modeleService: ModeleService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.modeleService
            .query()
            .pipe(
                filter((res: HttpResponse<IModele[]>) => res.ok),
                map((res: HttpResponse<IModele[]>) => res.body)
            )
            .subscribe(
                (res: IModele[]) => {
                    this.modeles = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInModeles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IModele) {
        return item.id;
    }

    registerChangeInModeles() {
        this.eventSubscriber = this.eventManager.subscribe('modeleListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
