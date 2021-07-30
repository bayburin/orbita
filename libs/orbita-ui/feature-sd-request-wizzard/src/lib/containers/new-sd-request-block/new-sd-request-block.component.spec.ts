import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  EmployeeFacade,
  EmployeeFacadeStub,
  EmployeeFilters,
  ServiceDeskFacade,
  ServiceDeskFacadeStub,
} from '@orbita/orbita-ui/domain-logic';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';

import { NewSdRequestBlockComponent } from './new-sd-request-block.component';

describe('NewSdRequestBlockComponent', () => {
  let component: NewSdRequestBlockComponent;
  let fixture: ComponentFixture<NewSdRequestBlockComponent>;
  let employeeFacade: EmployeeFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AutoCompleteModule, SelectButtonModule, CheckboxModule],
      declarations: [NewSdRequestBlockComponent],
      providers: [
        { provide: EmployeeFacade, useClass: EmployeeFacadeStub },
        { provide: ServiceDeskFacade, useClass: ServiceDeskFacadeStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSdRequestBlockComponent);
    component = fixture.componentInstance;
    employeeFacade = TestBed.inject(EmployeeFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('search()', () => {
    it('should call employeeFacade.search() method', () => {
      const spy = jest.spyOn(employeeFacade, 'search');
      const event = { query: 'fake-value' };

      component.search(event);

      expect(spy).toHaveBeenCalledWith(EmployeeFilters.FIO, 'fake-value');
    });
  });

  describe('selectEmployee()', () => {
    it('should set employee to form', () => {
      const employee = { fullName: 'fake-employee' };
      component.employee.setValue(employee);
      component.selectEmployee();

      expect(component.form.getRawValue().employee).toEqual(employee);
    });
  });

  describe('clearEmployee()', () => {
    it('should clear employee attribute into form', () => {
      const employee = { fullName: 'fake-employee' };
      component.employee.setValue(employee);
      component.selectEmployee();
      component.clearEmployee();

      expect(component.form.getRawValue().employee).toBeNull();
    });
  });
});
