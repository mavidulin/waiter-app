import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {CoreService} from '../../core/services/core.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  constructor(public authService: AuthService, public coreService: CoreService, private router: Router) { }

  ngOnInit() {

  }

  changeBar() {
    this.coreService.deactivateBar();
    this.router.navigate(['/app/bar-selection']);
  }

  signOut() {
    this.authService.signOut();
  }

  openSupport() {
    alert('Under construction!');
  }

  signOutWaiter() {
    this.coreService.signOutWaiter();
    this.router.navigate(['app/table-selection']);
  }

}
