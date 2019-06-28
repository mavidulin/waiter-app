import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {Bar, ShortBar} from '../models/bar.model';
import {BARS} from '../../mock-data/mock-data';
import {Waiter} from '../models/waiter.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  // ToDo: Redux would be a nice solution for storing this kind of info
  private _activeBar$ = new BehaviorSubject<Bar>(null);
  activeBar$ = this._activeBar$.asObservable();

  private _activeWaiter$ = new BehaviorSubject<Waiter>(null);
  activeWaiter$ = this._activeWaiter$.asObservable();

  private barStorageKey = 'barId';

  constructor() {
  }

  setActiveBar(barId: number) {
    const barFull = BARS.find(bar => bar.id === barId);
    this._activeBar$.next(barFull);
    sessionStorage.setItem(this.barStorageKey, barId.toString());
  }

  getActiveBar(): Observable<Bar> {
    const storedBarId = parseInt(sessionStorage.getItem(this.barStorageKey));

    if (storedBarId) {
      const bar = BARS.find(bar => bar.id === storedBarId);

      if (bar) {
        this._activeBar$.next(bar);
        return of(bar);
      }
    }

    return throwError('No active bar');
  }

  deactivateBar() {
    sessionStorage.removeItem(this.barStorageKey);
    this._activeBar$.next(null);

    this.signOutWaiter();
  }

  getActiveBarDetails(shortBar: ShortBar): Observable<Bar> {
    const barDetails = BARS.find(bar => bar.id === shortBar.id);
    return of(barDetails);
  }

  signInWaiter(bar: Bar, pin: string): Observable<Waiter> {
    const waiter = bar.waiters.find(waiter => waiter.pin === pin);

    if (waiter) {
      this._activeWaiter$.next(waiter);
      return of(waiter);
    }

    return throwError('Waiter with the PIN not found');
  }

  signOutWaiter() {
    this._activeWaiter$.next(null);
  }
}
