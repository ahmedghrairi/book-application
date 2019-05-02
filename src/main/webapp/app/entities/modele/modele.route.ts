import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Modele } from 'app/shared/model/modele.model';
import { ModeleService } from './modele.service';
import { ModeleComponent } from './modele.component';
import { ModeleDetailComponent } from './modele-detail.component';
import { ModeleUpdateComponent } from './modele-update.component';
import { ModeleDeletePopupComponent } from './modele-delete-dialog.component';
import { IModele } from 'app/shared/model/modele.model';

@Injectable({ providedIn: 'root' })
export class ModeleResolve implements Resolve<IModele> {
    constructor(private service: ModeleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IModele> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Modele>) => response.ok),
                map((modele: HttpResponse<Modele>) => modele.body)
            );
        }
        return of(new Modele());
    }
}

export const modeleRoute: Routes = [
    {
        path: '',
        component: ModeleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Modeles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ModeleDetailComponent,
        resolve: {
            modele: ModeleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Modeles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ModeleUpdateComponent,
        resolve: {
            modele: ModeleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Modeles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ModeleUpdateComponent,
        resolve: {
            modele: ModeleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Modeles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const modelePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ModeleDeletePopupComponent,
        resolve: {
            modele: ModeleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Modeles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
