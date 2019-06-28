import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {CoreService} from '../../core/services/core.service';

@Injectable()
export class NewOrderRouteGuard implements CanActivate {

  constructor(private coreService: CoreService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // allow if a waiter is active
    return this.coreService.activeWaiter$
      .pipe(
        switchMap(activeWaiter => {
          const isWaiterActive = !!activeWaiter;
          if (!isWaiterActive) this.router.navigate(['/app/table-selection']);
          return of(isWaiterActive);
        })
      );
  }

}
