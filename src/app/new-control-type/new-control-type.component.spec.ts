import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewControlTypeComponent } from './new-control-type.component';

describe('NewControlTypeComponent', () => {
  let component: NewControlTypeComponent;
  let fixture: ComponentFixture<NewControlTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewControlTypeComponent]
    });
    fixture = TestBed.createComponent(NewControlTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
