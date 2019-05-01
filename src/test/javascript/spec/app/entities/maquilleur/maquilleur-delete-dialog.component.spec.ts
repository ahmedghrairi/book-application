/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BookApplicationTestModule } from '../../../test.module';
import { MaquilleurDeleteDialogComponent } from 'app/entities/maquilleur/maquilleur-delete-dialog.component';
import { MaquilleurService } from 'app/entities/maquilleur/maquilleur.service';

describe('Component Tests', () => {
    describe('Maquilleur Management Delete Component', () => {
        let comp: MaquilleurDeleteDialogComponent;
        let fixture: ComponentFixture<MaquilleurDeleteDialogComponent>;
        let service: MaquilleurService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BookApplicationTestModule],
                declarations: [MaquilleurDeleteDialogComponent]
            })
                .overrideTemplate(MaquilleurDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MaquilleurDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaquilleurService);
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
