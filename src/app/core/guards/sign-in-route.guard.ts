import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class SignInRouteGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // allow if organisation is not active (not logged in)
    return this.authService.activeOrganisation$
      .pipe(
        switchMap(activeOrganisation => {
          const isOrganisationActive = !!activeOrganisation;
          if (isOrganisationActive) this.router.navigate(['/']);
          return of(!isOrganisationActive);
        })
      );
  }

}
