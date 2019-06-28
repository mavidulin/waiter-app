import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {ORGANISATIONS} from '../../mock-data/mock-data';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  organisations = ORGANISATIONS;

  singInForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });

  singInFailed = false;
  formSubmittedOnce = false;

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }


  signIn() {
    this.formSubmittedOnce = true;
    this.singInFailed = false;

    if (this.singInForm.invalid) return;

    const email = this.singInForm.get('email').value;
    const password = this.singInForm.get('password').value;

    this.authService.signIn(email, password)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['/app/bar-selection']);
      }, () => {
        this.singInFailed = true;
      });
  }
}
