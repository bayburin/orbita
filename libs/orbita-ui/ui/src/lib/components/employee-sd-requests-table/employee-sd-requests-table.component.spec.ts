import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Table } from 'primeng/table';

import { EmployeeSdRequestsTableComponent } from './employee-sd-requests-table.component';
import { Employee } from './../../../../../domain-logic/src/lib/entities/models/employee/employee.interface';

describe('EmployeeSdRequestsTableComponent', () => {
  let component: EmployeeSdRequestsTableComponent;
  let fixture: ComponentFixture<EmployeeSdRequestsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeSdRequestsTableComponent, Table],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSdRequestsTableComponent);
    component = fixture.componentInstance;
    component.sdRequests = [];
    component.employee = { id: 123 } as Employee;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onLazyLoad()', () => {
    it('should emit tableChanged event', () => {
      const spy = jest.spyOn(component.tableChanged, 'emit');

      component.onLazyLoad({ rows: 10 });

      expect(spy).toHaveBeenCalledWith({ rows: 10 });
    });
  });
});
