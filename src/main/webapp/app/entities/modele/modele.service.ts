import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IModele } from 'app/shared/model/modele.model';

type EntityResponseType = HttpResponse<IModele>;
type EntityArrayResponseType = HttpResponse<IModele[]>;

@Injectable({ providedIn: 'root' })
export class ModeleService {
    public resourceUrl = SERVER_API_URL + 'api/modeles';

    constructor(protected http: HttpClient) {}

    create(modele: IModele): Observable<EntityResponseType> {
        return this.http.post<IModele>(this.resourceUrl, modele, { observe: 'response' });
    }

    update(modele: IModele): Observable<EntityResponseType> {
        return this.http.put<IModele>(this.resourceUrl, modele, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IModele>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IModele[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
