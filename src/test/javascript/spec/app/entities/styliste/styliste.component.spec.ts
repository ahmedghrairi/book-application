/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BookApplicationTestModule } from '../../../test.module';
import { StylisteComponent } from 'app/entities/styliste/styliste.component';
import { StylisteService } from 'app/entities/styliste/styliste.service';
import { Styliste } from 'app/shared/model/styliste.model';

describe('Component Tests', () => {
    describe('Styliste Management Component', () => {
        let comp: StylisteComponent;
        let fixture: ComponentFixture<StylisteComponent>;
        let service: StylisteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [StylisteComponent],
                providers: []
            })
                .overrideTemplate(StylisteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StylisteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StylisteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Styliste(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.stylistes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
