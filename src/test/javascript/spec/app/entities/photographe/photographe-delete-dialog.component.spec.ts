/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BookApplicationTestModule } from '../../../test.module';
import { PhotographeDeleteDialogComponent } from 'app/entities/photographe/photographe-delete-dialog.component';
import { PhotographeService } from 'app/entities/photographe/photographe.service';

describe('Component Tests', () => {
    describe('Photographe Management Delete Component', () => {
        let comp: PhotographeDeleteDialogComponent;
        let fixture: ComponentFixture<PhotographeDeleteDialogComponent>;
        let service: PhotographeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [PhotographeDeleteDialogComponent]
            })
                .overrideTemplate(PhotographeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PhotographeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhotographeService);
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
