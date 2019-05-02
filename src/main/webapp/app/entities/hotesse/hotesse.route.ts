import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Hotesse } from 'app/shared/model/hotesse.model';
import { HotesseService } from './hotesse.service';
import { HotesseComponent } from './hotesse.component';
import { HotesseDetailComponent } from './hotesse-detail.component';
import { HotesseUpdateComponent } from './hotesse-update.component';
import { HotesseDeletePopupComponent } from './hotesse-delete-dialog.component';
import { IHotesse } from 'app/shared/model/hotesse.model';

@Injectable({ providedIn: 'root' })
export class HotesseResolve implements Resolve<IHotesse> {
    constructor(private service: HotesseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHotesse> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Hotesse>) => response.ok),
                map((hotesse: HttpResponse<Hotesse>) => hotesse.body)
            );
        }
        return of(new Hotesse());
    }
}

export const hotesseRoute: Routes = [
    {
        path: '',
        component: HotesseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hotesses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: HotesseDetailComponent,
        resolve: {
            hotesse: HotesseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hotesses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: HotesseUpdateComponent,
        resolve: {
            hotesse: HotesseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hotesses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: HotesseUpdateComponent,
        resolve: {
            hotesse: HotesseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hotesses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hotessePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: HotesseDeletePopupComponent,
        resolve: {
            hotesse: HotesseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hotesses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
