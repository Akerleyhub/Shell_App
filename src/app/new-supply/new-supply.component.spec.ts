import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSupplyComponent } from './new-supply.component';

describe('NewSupplyComponent', () => {
  let component: NewSupplyComponent;
  let fixture: ComponentFixture<NewSupplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSupplyComponent]
    });
    fixture = TestBed.createComponent(NewSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
