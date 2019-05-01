/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BookApplicationTestModule } from '../../../test.module';
import { MaquilleurComponent } from 'app/entities/maquilleur/maquilleur.component';
import { MaquilleurService } from 'app/entities/maquilleur/maquilleur.service';
import { Maquilleur } from 'app/shared/model/maquilleur.model';

describe('Component Tests', () => {
    describe('Maquilleur Management Component', () => {
        let comp: MaquilleurComponent;
        let fixture: ComponentFixture<MaquilleurComponent>;
        let service: MaquilleurService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [MaquilleurComponent],
                providers: []
            })
                .overrideTemplate(MaquilleurComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MaquilleurComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaquilleurService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Maquilleur(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.maquilleurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
