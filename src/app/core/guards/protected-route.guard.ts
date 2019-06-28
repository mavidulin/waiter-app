import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class ProtectedRouteGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.activeOrganisation$
      .pipe(
        switchMap(activeOrganisation => {
          if (!activeOrganisation) this.router.navigate(['/']);
          return of(!!activeOrganisation);
        })
      );
  }

}
