import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyteComponent } from './analyte.component';

describe('AnalyteComponent', () => {
  let component: AnalyteComponent;
  let fixture: ComponentFixture<AnalyteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyteComponent]
    });
    fixture = TestBed.createComponent(AnalyteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
