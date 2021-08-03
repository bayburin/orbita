import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  EmployeeFacade,
  EmployeeFacadeStub,
  EmployeeFilters,
  ServiceDeskFacade,
  ServiceDeskFacadeStub,
  SvtFacade,
  SvtFacadeStub,
  EmployeeShort,
  SdTicket,
  SvtItem,
} from '@orbita/orbita-ui/domain-logic';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

import { NewSdRequestBlockComponent } from './new-sd-request-block.component';

describe('NewSdRequestBlockComponent', () => {
  let component: NewSdRequestBlockComponent;
  let fixture: ComponentFixture<NewSdRequestBlockComponent>;
  let employeeFacade: EmployeeFacade;
  let svtFacade: SvtFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AutoCompleteModule, SelectButtonModule, CheckboxModule, DropdownModule],
      declarations: [NewSdRequestBlockComponent],
      providers: [
        { provide: EmployeeFacade, useClass: EmployeeFacadeStub },
        { provide: ServiceDeskFacade, useClass: ServiceDeskFacadeStub },
        { provide: SvtFacade, useClass: SvtFacadeStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSdRequestBlockComponent);
    component = fixture.componentInstance;
    employeeFacade = TestBed.inject(EmployeeFacade);
    svtFacade = TestBed.inject(SvtFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('searchEmployee()', () => {
    it('should call employeeFacade.searchEmployee() method', () => {
      const spy = jest.spyOn(employeeFacade, 'search');
      const event = { query: 'fake-value' };

      component.searchEmployee(event);

      expect(spy).toHaveBeenCalledWith(EmployeeFilters.FIO, 'fake-value');
    });
  });

  describe('selectEmployee()', () => {
    it('should set employee into form', () => {
      const employee = { fullName: 'fake-employee' } as EmployeeShort;
      const spy = jest.spyOn(svtFacade, 'loadItemsForForm');

      component.selectEmployee(employee);

      expect(component.form.getRawValue().employee).toEqual(employee);
      expect(spy).toHaveBeenCalledWith({ fio: employee.fullName });
    });
  });

  describe('clearEmployee()', () => {
    it('should clear employee attribute into form', () => {
      const employee = { fullName: 'fake-employee' } as EmployeeShort;

      component.employee.setValue(employee);
      component.selectEmployee(employee);
      component.clearEmployee();

      expect(component.form.getRawValue().employee).toBeNull();
    });
  });

  describe('searchTicket()', () => {
    it('should filter tickets', () => {
      /** */
    });
  });

  describe('selectTicket()', () => {
    it('should set ticket into form', () => {
      const ticket = { name: 'fake-ticket' } as SdTicket;

      component.ticket.setValue(ticket);
      component.selectTicket();

      expect(component.form.getRawValue().ticket).toEqual(ticket);
    });
  });

  describe('clearTicket()', () => {
    it('should clear ticket into form', () => {
      const ticket = { name: 'fake-ticket' } as SdTicket;

      component.ticket.setValue(ticket);
      component.selectTicket();
      component.clearTicket();

      expect(component.form.getRawValue().ticket).toBeNull();
    });
  });

  describe('searchSvtItem()', () => {
    it('should call employeeFacade.loadItemsForForm() method', () => {
      const svtItem = { short_item_model: 'fake-ticket' } as SvtItem;
      const spy = jest.spyOn(svtFacade, 'loadItemsForForm');

      component.searchSvtItem({ query: svtItem.short_item_model });

      expect(spy).toHaveBeenCalledWith({ [component.svtItemFilterKey.value.value]: svtItem.short_item_model });
    });
  });

  describe('selectSvtItem()', () => {
    it('should set svtItem into form', () => {
      const svtItem = { short_item_model: 'fake-ticket' } as SvtItem;

      component.selectSvtItem(svtItem);

      expect(component.form.getRawValue().svtItem).toEqual(svtItem);
    });
  });

  describe('clearSvtItem()', () => {
    it('should clear svtItem into form', () => {
      const svtItem = { short_item_model: 'fake-ticket' } as SvtItem;

      component.selectSvtItem(svtItem);
      component.clearSvtItem();

      expect(component.form.getRawValue().svtItem).toBeNull();
    });
  });
});
