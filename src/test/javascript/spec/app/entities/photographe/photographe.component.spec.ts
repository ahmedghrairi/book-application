/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BookApplicationTestModule } from '../../../test.module';
import { PhotographeComponent } from 'app/entities/photographe/photographe.component';
import { PhotographeService } from 'app/entities/photographe/photographe.service';
import { Photographe } from 'app/shared/model/photographe.model';

describe('Component Tests', () => {
    describe('Photographe Management Component', () => {
        let comp: PhotographeComponent;
        let fixture: ComponentFixture<PhotographeComponent>;
        let service: PhotographeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [PhotographeComponent],
                providers: []
            })
                .overrideTemplate(PhotographeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PhotographeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhotographeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Photographe(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.photographes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
