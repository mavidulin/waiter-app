import {NgModule} from '@angular/core';
import {BarSelectionComponent} from './bar-selection/bar-selection.component';
import {MainAppRoutingModule} from './main-app-routing.module';
import { TableSelectionComponent } from './table-selection/table-selection.component';
import { NewOrderComponent } from './new-order/new-order.component';
import {SharedModule} from '../shared/shared.module';
import {BarSelectionRouteGuard} from './guards/bar-selection-route.guard';
import {TableSelectionRouteGuard} from './guards/table-selection-route.guard';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {WaiterSignInComponent} from './waiter-sign-in/waiter-sign-in.component';
import {NewOrderRouteGuard} from './guards/new-order-route.guard';
import {OrderCreationComponent} from './new-order/order-creation/order-creation.component';
import {ReceiptComponent} from './new-order/receipt/receipt.component';

@NgModule({
  imports: [
    SharedModule,
    MainAppRoutingModule,
    NgbModalModule
  ],
  declarations: [
    BarSelectionComponent,
    TableSelectionComponent,
    NewOrderComponent,
    OrderCreationComponent,
    ReceiptComponent,
    WaiterSignInComponent
  ],
  entryComponents: [
    WaiterSignInComponent
  ],
  providers: [
    BarSelectionRouteGuard,
    TableSelectionRouteGuard,
    NewOrderRouteGuard
  ]
})
export class MainAppModule {

}
