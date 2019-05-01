import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHotesse } from 'app/shared/model/hotesse.model';

type EntityResponseType = HttpResponse<IHotesse>;
type EntityArrayResponseType = HttpResponse<IHotesse[]>;

@Injectable({ providedIn: 'root' })
export class HotesseService {
    public resourceUrl = SERVER_API_URL + 'api/hotesses';

    constructor(protected http: HttpClient) {}

    create(hotesse: IHotesse): Observable<EntityResponseType> {
        return this.http.post<IHotesse>(this.resourceUrl, hotesse, { observe: 'response' });
    }

    update(hotesse: IHotesse): Observable<EntityResponseType> {
        return this.http.put<IHotesse>(this.resourceUrl, hotesse, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHotesse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHotesse[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
