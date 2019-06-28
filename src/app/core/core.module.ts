import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ProtectedRouteGuard} from './guards/protected-route.guard';
import {SignInRouteGuard} from './guards/sign-in-route.guard';
import {ModalConfirmComponent} from './components/modal-confirm/modal-confirm.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PageNotFoundComponent,
    ModalConfirmComponent
  ],
  entryComponents: [
    ModalConfirmComponent
  ],
  providers: [
    ProtectedRouteGuard,
    SignInRouteGuard
  ]
})
export class CoreModule { }
