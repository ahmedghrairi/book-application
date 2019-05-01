import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStyliste } from 'app/shared/model/styliste.model';
import { StylisteService } from './styliste.service';

@Component({
    selector: 'jhi-styliste-delete-dialog',
    templateUrl: './styliste-delete-dialog.component.html'
})
export class StylisteDeleteDialogComponent {
    styliste: IStyliste;

    constructor(protected stylisteService: StylisteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stylisteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stylisteListModification',
                content: 'Deleted an styliste'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-styliste-delete-popup',
    template: ''
})
export class StylisteDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ styliste }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StylisteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.styliste = styliste;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/styliste', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/styliste', { outlets: { popup: null } }]);
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
