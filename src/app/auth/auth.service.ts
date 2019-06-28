import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {OrganisationAccount} from '../core/models/organisation-account.model';
import {ORGANISATIONS} from '../mock-data/mock-data';
import {Router} from '@angular/router';
import {CoreService} from '../core/services/core.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _activeOrganisation$ = new BehaviorSubject<OrganisationAccount>(null);
  activeOrganisation$ = this._activeOrganisation$.asObservable();

  private organisationStorageKey = 'organisationId';

  constructor(private router: Router, private coreService: CoreService) {

  }

  getLoggedInOrganisation(): Observable<OrganisationAccount> {
    const storedOrganisationId = parseInt(sessionStorage.getItem(this.organisationStorageKey));

    if (storedOrganisationId) {
      const organisation = ORGANISATIONS.find(organisation => organisation.id === storedOrganisationId);

      if (organisation) {
        this._activeOrganisation$.next(organisation);
        return of(organisation);
      }
    }

    return throwError('Not logged in');
  }

  signIn(email: string, password: string): Observable<OrganisationAccount> {
    const organisation = ORGANISATIONS.find(organisation => organisation.email === email);

    if (organisation && organisation.password === password) {
      sessionStorage.setItem(this.organisationStorageKey, organisation.id.toString());
      this._activeOrganisation$.next(organisation);
      return of(organisation);
    }

    return throwError('Incorrect username or password');
  }

  signOut() {
    sessionStorage.removeItem(this.organisationStorageKey);
    this._activeOrganisation$.next(null);

    this.coreService.deactivateBar();

    this.router.navigate(['/']);
  }

}
