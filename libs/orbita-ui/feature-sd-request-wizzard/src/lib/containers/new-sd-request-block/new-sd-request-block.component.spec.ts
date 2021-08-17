import { BehaviorSubject } from 'rxjs';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
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
  SdTicketViewModel,
  SdRequestFacade,
  SdRequestFacadeStub,
} from '@orbita/orbita-ui/domain-logic';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { NewSdRequestBlockComponent } from './new-sd-request-block.component';

@Component({})
class ExampleComponent {}

describe('NewSdRequestBlockComponent', () => {
  let component: NewSdRequestBlockComponent;
  let fixture: ComponentFixture<NewSdRequestBlockComponent>;
  let employeeFacade: EmployeeFacade;
  let serviceDeskFacade: ServiceDeskFacade;
  let svtFacade: SvtFacade;
  let sdRequestFacade: SdRequestFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AutoCompleteModule,
        SelectButtonModule,
        CheckboxModule,
        DropdownModule,
        RouterTestingModule.withRoutes([
          { path: 'tickets/sd-requests/:id', component: ExampleComponent },
          { path: 'tickets', component: ExampleComponent },
        ]),
      ],
      declarations: [NewSdRequestBlockComponent],
      providers: [
        { provide: EmployeeFacade, useClass: EmployeeFacadeStub },
        { provide: ServiceDeskFacade, useClass: ServiceDeskFacadeStub },
        { provide: SvtFacade, useClass: SvtFacadeStub },
        { provide: SdRequestFacade, useClass: SdRequestFacadeStub },
        DialogService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSdRequestBlockComponent);
    component = fixture.componentInstance;
    employeeFacade = TestBed.inject(EmployeeFacade);
    serviceDeskFacade = TestBed.inject(ServiceDeskFacade);
    sdRequestFacade = TestBed.inject(SdRequestFacade);
    svtFacade = TestBed.inject(SvtFacade);
    jest.spyOn(sdRequestFacade, 'initNewForm');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initNewForm() method', () => {
    expect(sdRequestFacade.initNewForm).toHaveBeenCalled();
  });

  describe('searchEmployee()', () => {
    it('should call searchEmployee() method', () => {
      const spy = jest.spyOn(employeeFacade, 'searchBySingleProp');
      const event = { query: 'fake-value' };

      component.searchEmployee(event);

      expect(spy).toHaveBeenCalledWith(EmployeeFilters.FIO, 'fake-value');
    });

    it('should not call searchEmployee() if value is empty', () => {
      const spy = jest.spyOn(employeeFacade, 'search');
      const event = { query: '' };

      component.searchEmployee(event);

      expect(spy).not.toHaveBeenCalledWith(EmployeeFilters.FIO, 'fake-value');
    });

    it('should not call searchEmployee() if value is not string', () => {
      const spy = jest.spyOn(employeeFacade, 'search');
      const event = { query: { foo: 'bar' } };

      component.searchEmployee(event);

      expect(spy).not.toHaveBeenCalledWith(EmployeeFilters.FIO, 'fake-value');
    });
  });

  describe('selectEmployee()', () => {
    it('should set employee into form', () => {
      const employee = { id: 123, fullName: 'fake-employee' } as EmployeeShort;
      const spy = jest.spyOn(svtFacade, 'loadItemsForForm');

      component.selectEmployee(employee);

      expect(component.form.getRawValue().employee).toEqual(employee);
      expect(spy).toHaveBeenCalledWith({ id_tn: employee.id });
    });

    it('should not call svtFacade.loadItemsForForm() if svtItemManually is true', () => {
      const employee = { id: 123, fullName: 'fake-employee' } as EmployeeShort;
      const spy = jest.spyOn(svtFacade, 'loadItemsForForm');

      component.svtItemManually.setValue(true);
      component.selectEmployee(employee);

      expect(spy).not.toHaveBeenCalledWith({ id_tn: employee.id });
    });

    it('should call svtFacade.loadItemsForForm() if svtItemManually is false', () => {
      const employee = { id: 123, fullName: 'fake-employee' } as EmployeeShort;
      const spy = jest.spyOn(svtFacade, 'loadItemsForForm');

      component.svtItemManually.setValue(false);
      component.selectEmployee(employee);

      expect(spy).toHaveBeenCalledWith({ id_tn: employee.id });
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
      const tickets = [{ name: 'first name' } as SdTicketViewModel, { name: 'second name' } as SdTicketViewModel];

      (serviceDeskFacade.allFreeApplicationsViewModel$ as BehaviorSubject<any>).next(tickets);
      component.searchTicket({ query: 'sec' });

      expect(component.tickets).toEqual([tickets[1]]);
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
    let svtItem: SvtItem;
    let spy: jest.SpyInstance;

    beforeEach(() => {
      svtItem = { short_item_model: 'fake-ticket' } as SvtItem;
      spy = jest.spyOn(svtFacade, 'loadItemsForForm');
    });

    it('should call loadItemsForForm() method', () => {
      component.searchSvtItem({ query: svtItem.short_item_model });

      expect(spy).toHaveBeenCalledWith({ [component.svtItemFilterKey.value.value]: svtItem.short_item_model });
    });

    it('should not call loadItemsForForm() if value is empty', () => {
      const event = { query: '' };

      component.searchSvtItem(event);

      expect(spy).not.toHaveBeenCalledWith();
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

  describe('backToCurrentSdRequest()', () => {
    let router: Router;
    let sdRequestFacade: SdRequestFacade;
    const id = 1;

    beforeEach(() => {
      router = TestBed.inject(Router);
      sdRequestFacade = TestBed.inject(SdRequestFacade);
      component.previewForm();
      jest.spyOn(router, 'navigate');
    });

    it('should navigate to created sd_request', () => {
      component.backToCurrentSdRequest(id);

      expect(router.navigate).toHaveBeenCalledWith(['/tickets', 'sd-requests', id]);
    });

    it('should call closeModalAfterCreateSdRequest method', () => {
      jest.spyOn(sdRequestFacade, 'closeModalAfterCreateSdRequest');
      component.backToCurrentSdRequest(id);

      expect(sdRequestFacade.closeModalAfterCreateSdRequest).toHaveBeenCalled();
    });

    it('should call close dialog window', () => {
      jest.spyOn(component.previewRef, 'close');
      component.backToCurrentSdRequest(id);

      expect(component.previewRef.close).toHaveBeenCalled();
    });
  });

  describe('backToSdRequestList()', () => {
    let router: Router;

    beforeEach(() => {
      router = TestBed.inject(Router);
      component.previewForm();
      jest.spyOn(router, 'navigate');
    });

    it('should navigate to created sd_request', () => {
      component.backToSdRequestList();

      expect(router.navigate).toHaveBeenCalledWith(['/tickets']);
    });

    it('should call closeModalAfterCreateSdRequest method', () => {
      jest.spyOn(sdRequestFacade, 'closeModalAfterCreateSdRequest');
      component.backToSdRequestList();

      expect(sdRequestFacade.closeModalAfterCreateSdRequest).toHaveBeenCalled();
    });

    it('should call close dialog window', () => {
      jest.spyOn(component.previewRef, 'close');
      component.backToSdRequestList();

      expect(component.previewRef.close).toHaveBeenCalled();
    });
  });

  describe('resetForm()', () => {
    it('should clear all FormControls', () => {
      component.previewForm();
      jest.spyOn(sdRequestFacade, 'closeModalAfterCreateSdRequest');
      jest.spyOn(component.previewRef, 'close');
      jest.spyOn(component, 'searchTicket');
      jest.spyOn(component.form, 'reset');
      jest.spyOn(sdRequestFacade, 'clearCreatedForm');

      component.resetForm();

      expect(sdRequestFacade.closeModalAfterCreateSdRequest).toHaveBeenCalled();
      expect(component.previewRef.close).toHaveBeenCalled();
      expect(component.employee.value).toBeNull();
      expect(component.employeeFilterKey.value).toEqual(component.employeeFilters[0]);
      expect(component.ticket.value).toBeNull();
      expect(component.searchTicket).toHaveBeenCalledWith({ query: '' });
      expect(component.employeeSvtItem.value).toBeNull();
      expect(component.customSvtItem.value).toBeNull();
      expect(component.svtItemManually.value).toBeNull();
      expect(component.svtItemFilterKey.value).toEqual(component.svtItemFilters[0]);
      expect(component.form.reset).toHaveBeenCalled();
      expect(sdRequestFacade.clearCreatedForm).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy()', () => {
    it('should call unsubscribe() method', () => {
      const spy = jest.spyOn(component.subscriptions, 'unsubscribe');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });

    it('should call clearCreatedForm() method', () => {
      const spy = jest.spyOn(sdRequestFacade, 'clearCreatedForm');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });

    it('should call clearEmployeeShortEntities() method', () => {
      const spy = jest.spyOn(employeeFacade, 'clearEmployeeShortEntities');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });
  });
});
