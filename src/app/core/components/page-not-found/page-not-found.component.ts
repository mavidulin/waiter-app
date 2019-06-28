import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: '<h2 class="mt-5 text-center">Sorry, the requested page was not found. <a href="/">Go Back!</a></h2>'
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
