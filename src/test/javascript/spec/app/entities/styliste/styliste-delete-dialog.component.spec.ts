/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BookApplicationTestModule } from '../../../test.module';
import { StylisteDeleteDialogComponent } from 'app/entities/styliste/styliste-delete-dialog.component';
import { StylisteService } from 'app/entities/styliste/styliste.service';

describe('Component Tests', () => {
    describe('Styliste Management Delete Component', () => {
        let comp: StylisteDeleteDialogComponent;
        let fixture: ComponentFixture<StylisteDeleteDialogComponent>;
        let service: StylisteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [StylisteDeleteDialogComponent]
            })
                .overrideTemplate(StylisteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StylisteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StylisteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
