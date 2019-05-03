/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BookApplicationTestModule } from '../../../test.module';
import { ModeleUpdateComponent } from 'app/entities/modele/modele-update.component';
import { ModeleService } from 'app/entities/modele/modele.service';
import { Modele } from 'app/shared/model/modele.model';

describe('Component Tests', () => {
    describe('Modele Management Update Component', () => {
        let comp: ModeleUpdateComponent;
        let fixture: ComponentFixture<ModeleUpdateComponent>;
        let service: ModeleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [ModeleUpdateComponent],
                providers: [FormBuilder]
            })
                .overrideTemplate(ModeleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ModeleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModeleService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Modele(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.updateForm(entity);
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Modele();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.updateForm(entity);
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
