import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStylePhoto } from 'app/shared/model/style-photo.model';
import { StylePhotoService } from './style-photo.service';

@Component({
    selector: 'jhi-style-photo-delete-dialog',
    templateUrl: './style-photo-delete-dialog.component.html'
})
export class StylePhotoDeleteDialogComponent {
    stylePhoto: IStylePhoto;

    constructor(
        protected stylePhotoService: StylePhotoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stylePhotoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stylePhotoListModification',
                content: 'Deleted an stylePhoto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-style-photo-delete-popup',
    template: ''
})
export class StylePhotoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stylePhoto }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StylePhotoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.stylePhoto = stylePhoto;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/style-photo', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/style-photo', { outlets: { popup: null } }]);
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
