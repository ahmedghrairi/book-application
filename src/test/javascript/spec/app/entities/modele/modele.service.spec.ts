/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ModeleService } from 'app/entities/modele/modele.service';
import { IModele, Modele, CouleurYeux, CouleurCheveux, Experience, TypeModele } from 'app/shared/model/modele.model';

describe('Service Tests', () => {
    describe('Modele Service', () => {
        let injector: TestBed;
        let service: ModeleService;
        let httpMock: HttpTestingController;
        let elemDefault: IModele;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ModeleService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new Modele(0, 0, 0, 0, 0, 0, 0, CouleurYeux.VERT, CouleurCheveux.VERT, Experience.DEBUTANT, TypeModele.MODELE);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Modele', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new Modele(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Modele', async () => {
                const returnedFromService = Object.assign(
                    {
                        taille: 1,
                        poids: 1,
                        pointure: 1,
                        taillePoitrine: 1,
                        tourDeTaille: 1,
                        tourDeHanche: 1,
                        couleurDesYeux: 'BBBBBB',
                        couleurDeCheveux: 'BBBBBB',
                        experience: 'BBBBBB',
                        type: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Modele', async () => {
                const returnedFromService = Object.assign(
                    {
                        taille: 1,
                        poids: 1,
                        pointure: 1,
                        taillePoitrine: 1,
                        tourDeTaille: 1,
                        tourDeHanche: 1,
                        couleurDesYeux: 'BBBBBB',
                        couleurDeCheveux: 'BBBBBB',
                        experience: 'BBBBBB',
                        type: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Modele', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
