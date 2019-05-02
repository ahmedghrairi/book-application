/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BookApplicationTestModule } from '../../../test.module';
import { StylisteUpdateComponent } from 'app/entities/styliste/styliste-update.component';
import { StylisteService } from 'app/entities/styliste/styliste.service';
import { Styliste } from 'app/shared/model/styliste.model';

describe('Component Tests', () => {
    describe('Styliste Management Update Component', () => {
        let comp: StylisteUpdateComponent;
        let fixture: ComponentFixture<StylisteUpdateComponent>;
        let service: StylisteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [StylisteUpdateComponent]
            })
                .overrideTemplate(StylisteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StylisteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StylisteService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Styliste(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.styliste = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Styliste();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.styliste = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
