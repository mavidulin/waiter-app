import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Bar} from '../../core/models/bar.model';
import {CoreService} from '../../core/services/core.service';
import {take} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-waiter-sign-in',
  templateUrl: './waiter-sign-in.component.html',
  styleUrls: ['./waiter-sign-in.component.scss']
})
export class WaiterSignInComponent {

  bar: Bar;

  signInError$ = new Subject<boolean>();

  constructor(private activeModal: NgbActiveModal, private coreService: CoreService) { }

  signIn(pin: string) {
    this.coreService.signInWaiter(this.bar, pin)
      .pipe(take(1))
      .subscribe(
        waiter => this.activeModal.close(),
        error => this.signInError$.next(true)
        );
  }

  closeError() {
    this.signInError$.next(false);
  }

  getAvailablePins() {
    return this.bar.waiters.map(w => w.pin).join(', ');
  }
}
