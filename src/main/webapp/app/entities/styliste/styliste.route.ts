import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Styliste } from 'app/shared/model/styliste.model';
import { StylisteService } from './styliste.service';
import { StylisteComponent } from './styliste.component';
import { StylisteDetailComponent } from './styliste-detail.component';
import { StylisteUpdateComponent } from './styliste-update.component';
import { StylisteDeletePopupComponent } from './styliste-delete-dialog.component';
import { IStyliste } from 'app/shared/model/styliste.model';

@Injectable({ providedIn: 'root' })
export class StylisteResolve implements Resolve<IStyliste> {
    constructor(private service: StylisteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStyliste> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Styliste>) => response.ok),
                map((styliste: HttpResponse<Styliste>) => styliste.body)
            );
        }
        return of(new Styliste());
    }
}

export const stylisteRoute: Routes = [
    {
        path: '',
        component: StylisteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stylistes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: StylisteDetailComponent,
        resolve: {
            styliste: StylisteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stylistes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: StylisteUpdateComponent,
        resolve: {
            styliste: StylisteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stylistes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: StylisteUpdateComponent,
        resolve: {
            styliste: StylisteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stylistes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stylistePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: StylisteDeletePopupComponent,
        resolve: {
            styliste: StylisteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stylistes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
