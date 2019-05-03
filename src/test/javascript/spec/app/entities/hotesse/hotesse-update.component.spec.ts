/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BookApplicationTestModule } from '../../../test.module';
import { HotesseUpdateComponent } from 'app/entities/hotesse/hotesse-update.component';
import { HotesseService } from 'app/entities/hotesse/hotesse.service';
import { Hotesse } from 'app/shared/model/hotesse.model';

describe('Component Tests', () => {
    describe('Hotesse Management Update Component', () => {
        let comp: HotesseUpdateComponent;
        let fixture: ComponentFixture<HotesseUpdateComponent>;
        let service: HotesseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [HotesseUpdateComponent],
                providers: [FormBuilder]
            })
                .overrideTemplate(HotesseUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HotesseUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HotesseService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Hotesse(123);
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
                const entity = new Hotesse();
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
