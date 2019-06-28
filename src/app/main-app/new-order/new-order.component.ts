import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {Receipt} from './receipt.model';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewOrderComponent implements OnInit {

  tableId$ = new BehaviorSubject<string>('');
  receipt: Receipt;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(take(1))
      .subscribe(params => {
        this.tableId$.next(params['tableId']);
      });
  }

  showReceipt(receipt: Receipt) {
    this.receipt = receipt;
  }

}
