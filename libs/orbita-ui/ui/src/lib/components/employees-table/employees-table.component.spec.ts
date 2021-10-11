import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { EmployeesTableComponent } from './employees-table.component';

describe('EmployeesTableComponent', () => {
  let component: EmployeesTableComponent;
  let fixture: ComponentFixture<EmployeesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesTableComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
