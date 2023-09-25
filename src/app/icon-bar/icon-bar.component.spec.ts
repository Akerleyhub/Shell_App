import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBarComponent } from './icon-bar.component';

describe('IconBarComponent', () => {
  let component: IconBarComponent;
  let fixture: ComponentFixture<IconBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconBarComponent]
    });
    fixture = TestBed.createComponent(IconBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
