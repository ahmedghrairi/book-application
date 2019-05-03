/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BookApplicationTestModule } from '../../../test.module';
import { MaquilleurUpdateComponent } from 'app/entities/maquilleur/maquilleur-update.component';
import { MaquilleurService } from 'app/entities/maquilleur/maquilleur.service';
import { Maquilleur } from 'app/shared/model/maquilleur.model';

describe('Component Tests', () => {
    describe('Maquilleur Management Update Component', () => {
        let comp: MaquilleurUpdateComponent;
        let fixture: ComponentFixture<MaquilleurUpdateComponent>;
        let service: MaquilleurService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [MaquilleurUpdateComponent],
                providers: [FormBuilder]
            })
                .overrideTemplate(MaquilleurUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MaquilleurUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaquilleurService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Maquilleur(123);
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
                const entity = new Maquilleur();
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
