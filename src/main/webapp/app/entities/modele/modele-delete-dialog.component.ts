import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IModele } from 'app/shared/model/modele.model';
import { ModeleService } from './modele.service';

@Component({
    selector: 'jhi-modele-delete-dialog',
    templateUrl: './modele-delete-dialog.component.html'
})
export class ModeleDeleteDialogComponent {
    modele: IModele;

    constructor(protected modeleService: ModeleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.modeleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'modeleListModification',
                content: 'Deleted an modele'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-modele-delete-popup',
    template: ''
})
export class ModeleDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ modele }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ModeleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.modele = modele;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/modele', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/modele', { outlets: { popup: null } }]);
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
