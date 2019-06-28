import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {distinctUntilChanged, take, takeUntil} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {BehaviorSubject, Subject} from 'rxjs';
import {AbstractControl, FormArray, FormBuilder, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Receipt, ReceiptItem} from '../receipt.model';
import {AuthService} from '../../../auth/auth.service';
import {CoreService} from '../../../core/services/core.service';
import {PriceListItem} from '../../../core/models/price-list.model';
import {ModalConfirmComponent} from '../../../core/components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-order-creation',
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderCreationComponent implements OnInit, OnDestroy {

  @Input() tableId: string;
  @Output() showReceipt = new EventEmitter<Receipt>();

  total$ = new BehaviorSubject<number>(0);
  onDestroy$ = new Subject();

  orderForm = this.formBuilder.group({
    items: this.formBuilder.array([])
  });

  constructor(public coreService: CoreService, private formBuilder: FormBuilder, private ngbModal: NgbModal, private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.watchOrderFormChanges();
  }

  private watchOrderFormChanges() {
    this.itemsFormArray.valueChanges
      .pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntil(this.onDestroy$)
      )
      .subscribe(formItems => {
        const prices = formItems.map(formItem => formItem.price * formItem.qty);
        this.total$.next(prices.reduce((a, b) => a + b, 0));
      });
  }

  get itemsFormArray(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItem(priceListItem: PriceListItem) {
    this.itemsFormArray.push(this.formBuilder.group({
      qty: [1, [Validators.required, Validators.min(1)]],
      price: priceListItem.price,
      name: priceListItem.name
    }));
  }

  removeItem(index: number) {
    this.itemsFormArray.removeAt(index);
  }

  isItemAdded(priceListItem: PriceListItem): boolean {
    const selectedItems = this.itemsFormArray.value;
    return selectedItems.some(selectedItem => selectedItem.name === priceListItem.name);
  }

  discard() {
    const ngbModalRef = this.ngbModal.open(ModalConfirmComponent, {backdrop: 'static'});
    const modalConfirmComponent = ngbModalRef.componentInstance as ModalConfirmComponent;

    modalConfirmComponent.title = 'Are you sure';
    modalConfirmComponent.body = 'Are you sure you want to discard the order?';

    ngbModalRef.result
      .then(() => {
        this.router.navigate(['app/table-selection']);
      }, () => {});
  }

  createReceipt() {
    const receipt = new Receipt();
    receipt.date = new Date();
    receipt.table = this.tableId;
    receipt.items = [];

    (this.itemsFormArray.value as any[]).forEach(formItem => {
      receipt.items.push(new ReceiptItem(formItem.name, formItem.price, formItem.qty));
    });

    receipt.total = this.total$.getValue();

    forkJoin({
      waiter: this.coreService.activeWaiter$.pipe(take(1)),
      bar: this.coreService.activeBar$.pipe(take(1)),
      organisation: this.authService.activeOrganisation$.pipe(take(1))
    })
      .pipe(take(1))
      .subscribe(res => {
        receipt.organisation = res.organisation;
        receipt.bar = res.bar;
        receipt.waiter = res.waiter;

        this.showReceipt.next(receipt);
      });
  }

  increaseQty(index: number) {
    const qtyControl = this.getQtyControlByIndex(index);
    const qty = qtyControl.value;
    qtyControl.setValue(qty + 1);
  }

  decreaseQty(index: number) {
    const qtyControl = this.getQtyControlByIndex(index);
    const qty = qtyControl.value;
    const newQty = qty - 1;

    if (newQty > 0) qtyControl.setValue(newQty);
  }

  private getQtyControlByIndex(index: number): AbstractControl {
    return this.itemsFormArray.at(index).get('qty');
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

}
