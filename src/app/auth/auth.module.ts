import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [SignInComponent],
})
export class AuthModule { }
