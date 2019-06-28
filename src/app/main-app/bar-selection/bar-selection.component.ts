import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CoreService} from '../../core/services/core.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-bar-selection',
  templateUrl: './bar-selection.component.html',
  styleUrls: ['./bar-selection.component.scss']
})
export class BarSelectionComponent implements OnInit {

  constructor(private router: Router, private coreService: CoreService, public authService: AuthService) { }

  ngOnInit() {

  }

  selectBar(bar) {
    this.coreService.setActiveBar(bar.id);
    this.router.navigate(['app/table-selection']);
  }

}
