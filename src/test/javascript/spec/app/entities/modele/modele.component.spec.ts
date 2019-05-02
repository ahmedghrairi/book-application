/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BookApplicationTestModule } from '../../../test.module';
import { ModeleComponent } from 'app/entities/modele/modele.component';
import { ModeleService } from 'app/entities/modele/modele.service';
import { Modele } from 'app/shared/model/modele.model';

describe('Component Tests', () => {
    describe('Modele Management Component', () => {
        let comp: ModeleComponent;
        let fixture: ComponentFixture<ModeleComponent>;
        let service: ModeleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [ModeleComponent],
                providers: []
            })
                .overrideTemplate(ModeleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ModeleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModeleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Modele(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.modeles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
