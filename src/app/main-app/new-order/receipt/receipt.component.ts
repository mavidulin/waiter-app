import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Receipt} from '../receipt.model';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiptComponent implements OnInit {

  @Input() receipt: Receipt;

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      window.print();
    }, 200);
  }

  done() {
    this.router.navigate(['app/table-selection']);
  }

  print() {
    window.print();
  }

}
