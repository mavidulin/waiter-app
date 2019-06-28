import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoreService} from '../../core/services/core.service';
import {Observable, Subject} from 'rxjs';
import {Bar} from '../../core/models/bar.model';
import {map, skip, switchMap, take, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {WaiterSignInComponent} from '../waiter-sign-in/waiter-sign-in.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table-selection',
  templateUrl: './table-selection.component.html',
  styleUrls: ['./table-selection.component.scss']
})
export class TableSelectionComponent implements OnInit, OnDestroy {

  activeBarFull$: Observable<Bar>;
  openSignInModal$ = new Subject();
  waiterSignInModalRef: NgbModalRef;
  onDestroy$ = new Subject();

  constructor(public coreService: CoreService, private ngbModal: NgbModal, private router: Router) { }

  ngOnInit() {
    this.activeBarFull$ = this.coreService.activeBar$
      .pipe(
        take(1),
        switchMap(activeBar => this.coreService.getActiveBarDetails(activeBar)),
        tap(bar => this.openSignInModal$.next())
      );

    this.openSignInModal$
      .pipe(
        withLatestFrom(this.activeBarFull$),
        map(([openEvt, activeBarFull]) => {
          this.openSignInModal(activeBarFull);
        }),
        takeUntil(this.onDestroy$)
      ).subscribe();

    this.coreService.activeWaiter$
      .pipe(
        skip(1),
        takeUntil(this.onDestroy$)
      )
      .subscribe(activeWaiter => {
        if (!activeWaiter) this.openSignInModal$.next();
      });
  }

  private openSignInModal(activeBar: Bar) {
    const ngbModalRef = this.ngbModal.open(WaiterSignInComponent, {backdrop: 'static'});
    const waiterSignInComponent = ngbModalRef.componentInstance as WaiterSignInComponent;
    waiterSignInComponent.bar = activeBar;

    this.waiterSignInModalRef = ngbModalRef;
  }

  selectTable(table: string) {
    this.router.navigate(['app/new-order', table])
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.waiterSignInModalRef.close();
  }

}
