/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BookApplicationTestModule } from '../../../test.module';
import { StylePhotoUpdateComponent } from 'app/entities/style-photo/style-photo-update.component';
import { StylePhotoService } from 'app/entities/style-photo/style-photo.service';
import { StylePhoto } from 'app/shared/model/style-photo.model';

describe('Component Tests', () => {
    describe('StylePhoto Management Update Component', () => {
        let comp: StylePhotoUpdateComponent;
        let fixture: ComponentFixture<StylePhotoUpdateComponent>;
        let service: StylePhotoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [StylePhotoUpdateComponent],
                providers: [FormBuilder]
            })
                .overrideTemplate(StylePhotoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StylePhotoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StylePhotoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new StylePhoto(123);
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
                const entity = new StylePhoto();
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
