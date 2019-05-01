import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StylePhoto } from 'app/shared/model/style-photo.model';
import { StylePhotoService } from './style-photo.service';
import { StylePhotoComponent } from './style-photo.component';
import { StylePhotoDetailComponent } from './style-photo-detail.component';
import { StylePhotoUpdateComponent } from './style-photo-update.component';
import { StylePhotoDeletePopupComponent } from './style-photo-delete-dialog.component';
import { IStylePhoto } from 'app/shared/model/style-photo.model';

@Injectable({ providedIn: 'root' })
export class StylePhotoResolve implements Resolve<IStylePhoto> {
    constructor(private service: StylePhotoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStylePhoto> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<StylePhoto>) => response.ok),
                map((stylePhoto: HttpResponse<StylePhoto>) => stylePhoto.body)
            );
        }
        return of(new StylePhoto());
    }
}

export const stylePhotoRoute: Routes = [
    {
        path: '',
        component: StylePhotoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StylePhotos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: StylePhotoDetailComponent,
        resolve: {
            stylePhoto: StylePhotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StylePhotos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: StylePhotoUpdateComponent,
        resolve: {
            stylePhoto: StylePhotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StylePhotos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: StylePhotoUpdateComponent,
        resolve: {
            stylePhoto: StylePhotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StylePhotos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stylePhotoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: StylePhotoDeletePopupComponent,
        resolve: {
            stylePhoto: StylePhotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StylePhotos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
