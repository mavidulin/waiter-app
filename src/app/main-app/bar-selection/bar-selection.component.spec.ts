import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarSelectionComponent } from './bar-selection.component';

describe('BarSelectionComponent', () => {
  let component: BarSelectionComponent;
  let fixture: ComponentFixture<BarSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
