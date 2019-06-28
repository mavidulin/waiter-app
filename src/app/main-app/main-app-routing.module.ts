import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BarSelectionComponent} from './bar-selection/bar-selection.component';
import {TableSelectionComponent} from './table-selection/table-selection.component';
import {NewOrderComponent} from './new-order/new-order.component';
import {BarSelectionRouteGuard} from './guards/bar-selection-route.guard';
import {TableSelectionRouteGuard} from './guards/table-selection-route.guard';
import {NewOrderRouteGuard} from './guards/new-order-route.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/page-not-found',
    pathMatch: 'full'
  },
  {
    path: 'bar-selection',
    component: BarSelectionComponent,
    canActivate: [BarSelectionRouteGuard]
  },
  {
    path: 'table-selection',
    component: TableSelectionComponent,
    canActivate: [TableSelectionRouteGuard]
  },
  {
    path: 'new-order/:tableId',
    component: NewOrderComponent,
    canActivate: [TableSelectionRouteGuard, NewOrderRouteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule {}
