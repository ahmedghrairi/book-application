/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BookApplicationTestModule } from '../../../test.module';
import { AgenceComponent } from 'app/entities/agence/agence.component';
import { AgenceService } from 'app/entities/agence/agence.service';
import { Agence } from 'app/shared/model/agence.model';

describe('Component Tests', () => {
    describe('Agence Management Component', () => {
        let comp: AgenceComponent;
        let fixture: ComponentFixture<AgenceComponent>;
        let service: AgenceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [AgenceComponent],
                providers: []
            })
                .overrideTemplate(AgenceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgenceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgenceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Agence(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.agences[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
