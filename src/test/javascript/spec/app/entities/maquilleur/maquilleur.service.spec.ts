/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { MaquilleurService } from 'app/entities/maquilleur/maquilleur.service';
import { IMaquilleur, Maquilleur, Experience } from 'app/shared/model/maquilleur.model';

describe('Service Tests', () => {
    describe('Maquilleur Service', () => {
        let injector: TestBed;
        let service: MaquilleurService;
        let httpMock: HttpTestingController;
        let elemDefault: IMaquilleur;
        let expectedResult;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            expectedResult = {};
            injector = getTestBed();
            service = injector.get(MaquilleurService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new Maquilleur(0, Experience.DEBUTANT);
        });

        describe('Service methods', () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => (expectedResult = resp));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(returnedFromService);
                expect(expectedResult).toMatchObject({ body: elemDefault });
            });

            it('should create a Maquilleur', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new Maquilleur(null))
                    .pipe(take(1))
                    .subscribe(resp => (expectedResult = resp));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(returnedFromService);
                expect(expectedResult).toMatchObject({ body: expected });
            });

            it('should update a Maquilleur', async () => {
                const returnedFromService = Object.assign(
                    {
                        experience: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => (expectedResult = resp));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(returnedFromService);
                expect(expectedResult).toMatchObject({ body: expected });
            });

            it('should return a list of Maquilleur', async () => {
                const returnedFromService = Object.assign(
                    {
                        experience: 'BBBBBB'
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
                    .subscribe(body => (expectedResult = body));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush([returnedFromService]);
                httpMock.verify();
                expect(expectedResult).toContainEqual(expected);
            });

            it('should delete a Maquilleur', async () => {
                const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
                expect(expectedResult);
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
