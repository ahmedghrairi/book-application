import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPhotographe } from 'app/shared/model/photographe.model';

type EntityResponseType = HttpResponse<IPhotographe>;
type EntityArrayResponseType = HttpResponse<IPhotographe[]>;

@Injectable({ providedIn: 'root' })
export class PhotographeService {
    public resourceUrl = SERVER_API_URL + 'api/photographes';

    constructor(protected http: HttpClient) {}

    create(photographe: IPhotographe): Observable<EntityResponseType> {
        return this.http.post<IPhotographe>(this.resourceUrl, photographe, { observe: 'response' });
    }

    update(photographe: IPhotographe): Observable<EntityResponseType> {
        return this.http.put<IPhotographe>(this.resourceUrl, photographe, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPhotographe>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPhotographe[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
