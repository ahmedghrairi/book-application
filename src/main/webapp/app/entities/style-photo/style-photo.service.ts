import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStylePhoto } from 'app/shared/model/style-photo.model';

type EntityResponseType = HttpResponse<IStylePhoto>;
type EntityArrayResponseType = HttpResponse<IStylePhoto[]>;

@Injectable({ providedIn: 'root' })
export class StylePhotoService {
    public resourceUrl = SERVER_API_URL + 'api/style-photos';

    constructor(protected http: HttpClient) {}

    create(stylePhoto: IStylePhoto): Observable<EntityResponseType> {
        return this.http.post<IStylePhoto>(this.resourceUrl, stylePhoto, { observe: 'response' });
    }

    update(stylePhoto: IStylePhoto): Observable<EntityResponseType> {
        return this.http.put<IStylePhoto>(this.resourceUrl, stylePhoto, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStylePhoto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStylePhoto[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
