/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BookApplicationTestModule } from '../../../test.module';
import { StylePhotoComponent } from 'app/entities/style-photo/style-photo.component';
import { StylePhotoService } from 'app/entities/style-photo/style-photo.service';
import { StylePhoto } from 'app/shared/model/style-photo.model';

describe('Component Tests', () => {
    describe('StylePhoto Management Component', () => {
        let comp: StylePhotoComponent;
        let fixture: ComponentFixture<StylePhotoComponent>;
        let service: StylePhotoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [StylePhotoComponent],
                providers: []
            })
                .overrideTemplate(StylePhotoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StylePhotoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StylePhotoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new StylePhoto(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.stylePhotos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
