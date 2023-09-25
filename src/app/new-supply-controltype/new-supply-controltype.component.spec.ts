import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSupplyControltypeComponent } from './new-supply-controltype.component';

describe('NewSupplyControltypeComponent', () => {
  let component: NewSupplyControltypeComponent;
  let fixture: ComponentFixture<NewSupplyControltypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSupplyControltypeComponent]
    });
    fixture = TestBed.createComponent(NewSupplyControltypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
