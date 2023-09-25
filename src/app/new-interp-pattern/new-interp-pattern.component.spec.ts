import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInterpPatternComponent } from './new-interp-pattern.component';

describe('NewInterpPatternComponent', () => {
  let component: NewInterpPatternComponent;
  let fixture: ComponentFixture<NewInterpPatternComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewInterpPatternComponent]
    });
    fixture = TestBed.createComponent(NewInterpPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
