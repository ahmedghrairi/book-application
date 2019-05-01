/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BookApplicationTestModule } from '../../../test.module';
import { PhotographeDetailComponent } from 'app/entities/photographe/photographe-detail.component';
import { Photographe } from 'app/shared/model/photographe.model';

describe('Component Tests', () => {
    describe('Photographe Management Detail Component', () => {
        let comp: PhotographeDetailComponent;
        let fixture: ComponentFixture<PhotographeDetailComponent>;
        const route = ({ data: of({ photographe: new Photographe(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [PhotographeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PhotographeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PhotographeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.photographe).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
