import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    NgbDropdownModule
  ],
  declarations: [AppLayoutComponent],
})
export class LayoutModule { }
