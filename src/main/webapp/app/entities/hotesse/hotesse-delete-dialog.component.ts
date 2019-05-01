import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHotesse } from 'app/shared/model/hotesse.model';
import { HotesseService } from './hotesse.service';

@Component({
    selector: 'jhi-hotesse-delete-dialog',
    templateUrl: './hotesse-delete-dialog.component.html'
})
export class HotesseDeleteDialogComponent {
    hotesse: IHotesse;

    constructor(protected hotesseService: HotesseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hotesseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hotesseListModification',
                content: 'Deleted an hotesse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hotesse-delete-popup',
    template: ''
})
export class HotesseDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hotesse }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HotesseDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.hotesse = hotesse;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/hotesse', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/hotesse', { outlets: { popup: null } }]);
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
