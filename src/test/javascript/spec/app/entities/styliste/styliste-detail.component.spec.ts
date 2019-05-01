/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BookApplicationTestModule } from '../../../test.module';
import { StylisteDetailComponent } from 'app/entities/styliste/styliste-detail.component';
import { Styliste } from 'app/shared/model/styliste.model';

describe('Component Tests', () => {
    describe('Styliste Management Detail Component', () => {
        let comp: StylisteDetailComponent;
        let fixture: ComponentFixture<StylisteDetailComponent>;
        const route = ({ data: of({ styliste: new Styliste(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [StylisteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StylisteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StylisteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.styliste).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
