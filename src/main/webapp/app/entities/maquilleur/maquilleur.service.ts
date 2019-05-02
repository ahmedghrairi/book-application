import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMaquilleur } from 'app/shared/model/maquilleur.model';

type EntityResponseType = HttpResponse<IMaquilleur>;
type EntityArrayResponseType = HttpResponse<IMaquilleur[]>;

@Injectable({ providedIn: 'root' })
export class MaquilleurService {
    public resourceUrl = SERVER_API_URL + 'api/maquilleurs';

    constructor(protected http: HttpClient) {}

    create(maquilleur: IMaquilleur): Observable<EntityResponseType> {
        return this.http.post<IMaquilleur>(this.resourceUrl, maquilleur, { observe: 'response' });
    }

    update(maquilleur: IMaquilleur): Observable<EntityResponseType> {
        return this.http.put<IMaquilleur>(this.resourceUrl, maquilleur, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMaquilleur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMaquilleur[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
