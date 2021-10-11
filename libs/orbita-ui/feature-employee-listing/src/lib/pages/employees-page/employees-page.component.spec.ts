import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { EmployeesPageComponent } from './employees-page.component';

describe('EmployeesPageComponent', () => {
  let component: EmployeesPageComponent;
  let fixture: ComponentFixture<EmployeesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
