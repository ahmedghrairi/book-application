/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BookApplicationTestModule } from '../../../test.module';
import { StylePhotoDetailComponent } from 'app/entities/style-photo/style-photo-detail.component';
import { StylePhoto } from 'app/shared/model/style-photo.model';

describe('Component Tests', () => {
    describe('StylePhoto Management Detail Component', () => {
        let comp: StylePhotoDetailComponent;
        let fixture: ComponentFixture<StylePhotoDetailComponent>;
        const route = ({ data: of({ stylePhoto: new StylePhoto(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [StylePhotoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StylePhotoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StylePhotoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.stylePhoto).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
