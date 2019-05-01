/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BookApplicationTestModule } from '../../../test.module';
import { HotesseDetailComponent } from 'app/entities/hotesse/hotesse-detail.component';
import { Hotesse } from 'app/shared/model/hotesse.model';

describe('Component Tests', () => {
    describe('Hotesse Management Detail Component', () => {
        let comp: HotesseDetailComponent;
        let fixture: ComponentFixture<HotesseDetailComponent>;
        const route = ({ data: of({ hotesse: new Hotesse(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [HotesseDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HotesseDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HotesseDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hotesse).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
