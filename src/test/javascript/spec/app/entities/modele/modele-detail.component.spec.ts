/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BookApplicationTestModule } from '../../../test.module';
import { ModeleDetailComponent } from 'app/entities/modele/modele-detail.component';
import { Modele } from 'app/shared/model/modele.model';

describe('Component Tests', () => {
    describe('Modele Management Detail Component', () => {
        let comp: ModeleDetailComponent;
        let fixture: ComponentFixture<ModeleDetailComponent>;
        const route = ({ data: of({ modele: new Modele(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [ModeleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ModeleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ModeleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.modele).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
