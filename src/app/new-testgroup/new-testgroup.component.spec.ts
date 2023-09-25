import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTestgroupComponent } from './new-testgroup.component';

describe('NewTestgroupComponent', () => {
  let component: NewTestgroupComponent;
  let fixture: ComponentFixture<NewTestgroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTestgroupComponent]
    });
    fixture = TestBed.createComponent(NewTestgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
