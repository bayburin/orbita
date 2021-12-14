import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibleIconComponent } from './visible-icon.component';

describe('VisibleIconComponent', () => {
  let component: VisibleIconComponent;
  let fixture: ComponentFixture<VisibleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisibleIconComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
