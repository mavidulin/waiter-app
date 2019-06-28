import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {CoreService} from '../../core/services/core.service';

@Injectable()
export class TableSelectionRouteGuard implements CanActivate {

  constructor(private coreService: CoreService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // allow if a bar is activated
    return this.coreService.activeBar$
      .pipe(
        switchMap(activeBar => {
          const isBarActive = !!activeBar;
          if (!isBarActive) this.router.navigate(['/app/bar-selection']);
          return of(isBarActive);
        })
      );
  }

}
