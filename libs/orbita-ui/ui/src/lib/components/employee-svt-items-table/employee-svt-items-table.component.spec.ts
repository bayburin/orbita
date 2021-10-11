import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { EmployeeSvtItemsTableComponent } from './employee-svt-items-table.component';

describe('EmployeeSvtItemsTableComponent', () => {
  let component: EmployeeSvtItemsTableComponent;
  let fixture: ComponentFixture<EmployeeSvtItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeSvtItemsTableComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSvtItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
