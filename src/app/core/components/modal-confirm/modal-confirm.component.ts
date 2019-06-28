import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html'
})
export class ModalConfirmComponent {

  title: string;
  body: string;

  constructor(private activeModal: NgbActiveModal) { }

  confirm() {
    this.activeModal.close()
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
