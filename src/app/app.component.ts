import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {CoreService} from './core/services/core.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  enableRouting = false;

  constructor(private authService: AuthService, private coreService: CoreService) {

  }

  ngOnInit(): void {
    // Before enabling the routing check if organisation is logged in and a bar is active
    this.authService.getLoggedInOrganisation()
      .pipe(take(1))
      .subscribe(
        () => {
          this.getActiveBar();
        },
        () => {
          this.enableRouting = true;
        });
  }

  private getActiveBar() {
    this.coreService.getActiveBar()
      .pipe(take(1))
      .subscribe(
        () => {
          this.enableRouting = true;
        },
        () => {
          this.enableRouting = true;
        });
  }

}
