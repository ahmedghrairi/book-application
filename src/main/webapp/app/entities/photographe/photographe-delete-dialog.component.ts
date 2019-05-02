import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPhotographe } from 'app/shared/model/photographe.model';
import { PhotographeService } from './photographe.service';

@Component({
    selector: 'jhi-photographe-delete-dialog',
    templateUrl: './photographe-delete-dialog.component.html'
})
export class PhotographeDeleteDialogComponent {
    photographe: IPhotographe;

    constructor(
        protected photographeService: PhotographeService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.photographeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'photographeListModification',
                content: 'Deleted an photographe'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-photographe-delete-popup',
    template: ''
})
export class PhotographeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ photographe }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PhotographeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.photographe = photographe;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/photographe', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/photographe', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
