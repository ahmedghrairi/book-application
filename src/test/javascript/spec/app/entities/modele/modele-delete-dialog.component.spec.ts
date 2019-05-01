/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BookApplicationTestModule } from '../../../test.module';
import { ModeleDeleteDialogComponent } from 'app/entities/modele/modele-delete-dialog.component';
import { ModeleService } from 'app/entities/modele/modele.service';

describe('Component Tests', () => {
    describe('Modele Management Delete Component', () => {
        let comp: ModeleDeleteDialogComponent;
        let fixture: ComponentFixture<ModeleDeleteDialogComponent>;
        let service: ModeleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [ModeleDeleteDialogComponent]
            })
                .overrideTemplate(ModeleDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ModeleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModeleService);
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
