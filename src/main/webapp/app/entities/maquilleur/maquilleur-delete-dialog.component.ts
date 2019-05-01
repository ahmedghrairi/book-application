import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMaquilleur } from 'app/shared/model/maquilleur.model';
import { MaquilleurService } from './maquilleur.service';

@Component({
    selector: 'jhi-maquilleur-delete-dialog',
    templateUrl: './maquilleur-delete-dialog.component.html'
})
export class MaquilleurDeleteDialogComponent {
    maquilleur: IMaquilleur;

    constructor(
        protected maquilleurService: MaquilleurService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.maquilleurService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'maquilleurListModification',
                content: 'Deleted an maquilleur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-maquilleur-delete-popup',
    template: ''
})
export class MaquilleurDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ maquilleur }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MaquilleurDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.maquilleur = maquilleur;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/maquilleur', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/maquilleur', { outlets: { popup: null } }]);
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
