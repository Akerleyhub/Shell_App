import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMethodComponent } from './new-method.component';

describe('NewMethodComponent', () => {
  let component: NewMethodComponent;
  let fixture: ComponentFixture<NewMethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMethodComponent]
    });
    fixture = TestBed.createComponent(NewMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
