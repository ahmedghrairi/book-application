/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BookApplicationTestModule } from '../../../test.module';
import { PhotographeUpdateComponent } from 'app/entities/photographe/photographe-update.component';
import { PhotographeService } from 'app/entities/photographe/photographe.service';
import { Photographe } from 'app/shared/model/photographe.model';

describe('Component Tests', () => {
    describe('Photographe Management Update Component', () => {
        let comp: PhotographeUpdateComponent;
        let fixture: ComponentFixture<PhotographeUpdateComponent>;
        let service: PhotographeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [PhotographeUpdateComponent],
                providers: [FormBuilder]
            })
                .overrideTemplate(PhotographeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PhotographeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhotographeService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Photographe(123);
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
                const entity = new Photographe();
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
