import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Photographe } from 'app/shared/model/photographe.model';
import { PhotographeService } from './photographe.service';
import { PhotographeComponent } from './photographe.component';
import { PhotographeDetailComponent } from './photographe-detail.component';
import { PhotographeUpdateComponent } from './photographe-update.component';
import { PhotographeDeletePopupComponent } from './photographe-delete-dialog.component';
import { IPhotographe } from 'app/shared/model/photographe.model';

@Injectable({ providedIn: 'root' })
export class PhotographeResolve implements Resolve<IPhotographe> {
    constructor(private service: PhotographeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPhotographe> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Photographe>) => response.ok),
                map((photographe: HttpResponse<Photographe>) => photographe.body)
            );
        }
        return of(new Photographe());
    }
}

export const photographeRoute: Routes = [
    {
        path: '',
        component: PhotographeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Photographes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PhotographeDetailComponent,
        resolve: {
            photographe: PhotographeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Photographes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PhotographeUpdateComponent,
        resolve: {
            photographe: PhotographeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Photographes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PhotographeUpdateComponent,
        resolve: {
            photographe: PhotographeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Photographes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const photographePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PhotographeDeletePopupComponent,
        resolve: {
            photographe: PhotographeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Photographes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
