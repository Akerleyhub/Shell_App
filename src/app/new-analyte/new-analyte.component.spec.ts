import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnalyteComponent } from './new-analyte.component';

describe('NewAnalyteComponent', () => {
  let component: NewAnalyteComponent;
  let fixture: ComponentFixture<NewAnalyteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAnalyteComponent]
    });
    fixture = TestBed.createComponent(NewAnalyteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
