import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Maquilleur } from 'app/shared/model/maquilleur.model';
import { MaquilleurService } from './maquilleur.service';
import { MaquilleurComponent } from './maquilleur.component';
import { MaquilleurDetailComponent } from './maquilleur-detail.component';
import { MaquilleurUpdateComponent } from './maquilleur-update.component';
import { MaquilleurDeletePopupComponent } from './maquilleur-delete-dialog.component';
import { IMaquilleur } from 'app/shared/model/maquilleur.model';

@Injectable({ providedIn: 'root' })
export class MaquilleurResolve implements Resolve<IMaquilleur> {
    constructor(private service: MaquilleurService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMaquilleur> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Maquilleur>) => response.ok),
                map((maquilleur: HttpResponse<Maquilleur>) => maquilleur.body)
            );
        }
        return of(new Maquilleur());
    }
}

export const maquilleurRoute: Routes = [
    {
        path: '',
        component: MaquilleurComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Maquilleurs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MaquilleurDetailComponent,
        resolve: {
            maquilleur: MaquilleurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Maquilleurs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MaquilleurUpdateComponent,
        resolve: {
            maquilleur: MaquilleurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Maquilleurs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MaquilleurUpdateComponent,
        resolve: {
            maquilleur: MaquilleurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Maquilleurs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const maquilleurPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MaquilleurDeletePopupComponent,
        resolve: {
            maquilleur: MaquilleurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Maquilleurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
