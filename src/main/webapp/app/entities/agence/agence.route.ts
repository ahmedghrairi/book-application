import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Agence } from 'app/shared/model/agence.model';
import { AgenceService } from './agence.service';
import { AgenceComponent } from './agence.component';
import { AgenceDetailComponent } from './agence-detail.component';
import { AgenceUpdateComponent } from './agence-update.component';
import { AgenceDeletePopupComponent } from './agence-delete-dialog.component';
import { IAgence } from 'app/shared/model/agence.model';

@Injectable({ providedIn: 'root' })
export class AgenceResolve implements Resolve<IAgence> {
    constructor(private service: AgenceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAgence> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Agence>) => response.ok),
                map((agence: HttpResponse<Agence>) => agence.body)
            );
        }
        return of(new Agence());
    }
}

export const agenceRoute: Routes = [
    {
        path: '',
        component: AgenceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agences'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AgenceDetailComponent,
        resolve: {
            agence: AgenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agences'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AgenceUpdateComponent,
        resolve: {
            agence: AgenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agences'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AgenceUpdateComponent,
        resolve: {
            agence: AgenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agences'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agencePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AgenceDeletePopupComponent,
        resolve: {
            agence: AgenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agences'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
