/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BookApplicationTestModule } from '../../../test.module';
import { HotesseComponent } from 'app/entities/hotesse/hotesse.component';
import { HotesseService } from 'app/entities/hotesse/hotesse.service';
import { Hotesse } from 'app/shared/model/hotesse.model';

describe('Component Tests', () => {
    describe('Hotesse Management Component', () => {
        let comp: HotesseComponent;
        let fixture: ComponentFixture<HotesseComponent>;
        let service: HotesseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [HotesseComponent],
                providers: []
            })
                .overrideTemplate(HotesseComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HotesseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HotesseService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Hotesse(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.hotesses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
