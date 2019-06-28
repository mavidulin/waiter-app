import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {CoreService} from '../../core/services/core.service';

@Injectable()
export class BarSelectionRouteGuard implements CanActivate {

  constructor(private coreService: CoreService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // allow if active bar is not already selected
    return this.coreService.activeBar$
      .pipe(
        switchMap(activeBar => {
          const isBarActive = !!activeBar;
          if (isBarActive) this.router.navigate(['/app/table-selection']);
          return of(!isBarActive);
        })
      );
  }

}
