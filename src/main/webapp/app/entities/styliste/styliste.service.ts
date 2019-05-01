import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStyliste } from 'app/shared/model/styliste.model';

type EntityResponseType = HttpResponse<IStyliste>;
type EntityArrayResponseType = HttpResponse<IStyliste[]>;

@Injectable({ providedIn: 'root' })
export class StylisteService {
    public resourceUrl = SERVER_API_URL + 'api/stylistes';

    constructor(protected http: HttpClient) {}

    create(styliste: IStyliste): Observable<EntityResponseType> {
        return this.http.post<IStyliste>(this.resourceUrl, styliste, { observe: 'response' });
    }

    update(styliste: IStyliste): Observable<EntityResponseType> {
        return this.http.put<IStyliste>(this.resourceUrl, styliste, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStyliste>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStyliste[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
