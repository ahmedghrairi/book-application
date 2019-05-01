/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BookApplicationTestModule } from '../../../test.module';
import { MaquilleurDetailComponent } from 'app/entities/maquilleur/maquilleur-detail.component';
import { Maquilleur } from 'app/shared/model/maquilleur.model';

describe('Component Tests', () => {
    describe('Maquilleur Management Detail Component', () => {
        let comp: MaquilleurDetailComponent;
        let fixture: ComponentFixture<MaquilleurDetailComponent>;
        const route = ({ data: of({ maquilleur: new Maquilleur(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [MaquilleurDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MaquilleurDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MaquilleurDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.maquilleur).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
