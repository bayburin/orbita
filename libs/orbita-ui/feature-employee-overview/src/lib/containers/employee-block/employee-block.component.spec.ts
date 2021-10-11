import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import {
  EmployeeFacade,
  EmployeeFacadeStub,
  SdRequestFacade,
  SdRequestFacadeStub,
  SdRequestViewModel,
  SvtFacade,
  SvtFacadeStub,
  AuthCenterFacade,
  AuthCenterFacadeStub,
} from '@orbita/orbita-ui/domain-logic';
import { Router } from '@angular/router';

import { EmployeeBlockComponent } from './employee-block.component';

@Component({})
class ExampleComponent {}

describe('EmployeeBlockComponent', () => {
  let component: EmployeeBlockComponent;
  let fixture: ComponentFixture<EmployeeBlockComponent>;
  let employeeFacade: EmployeeFacade;
  let sdRequestFacade: SdRequestFacade;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'tickets/sd-requests/:id', component: ExampleComponent }])],
      declarations: [EmployeeBlockComponent],
      providers: [
        { provide: EmployeeFacade, useClass: EmployeeFacadeStub },
        { provide: SdRequestFacade, useClass: SdRequestFacadeStub },
        { provide: SvtFacade, useClass: SvtFacadeStub },
        { provide: AuthCenterFacade, useClass: AuthCenterFacadeStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBlockComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    employeeFacade = TestBed.inject(EmployeeFacade);
    sdRequestFacade = TestBed.inject(SdRequestFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change "skeleton" attribute', () => {
    (component.employeeLoading$ as BehaviorSubject<boolean>).next(false);

    expect(component.skeleton).toBe(false);
  });

  it('should call loadFiltered() method', () => {
    const spy = jest.spyOn(employeeFacade, 'clearSelectedEmployee');

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });

  describe('tableChanged', () => {
    it('should call setTableMetadata method', () => {
      const spy = jest.spyOn(sdRequestFacade, 'loadFiltered');
      component.tableChanged({});

      expect(spy).toHaveBeenCalledWith({});
    });
  });

  describe('redirectToSdRequestPage()', () => {
    it('should redirect to employee page', () => {
      const employee = { id: 123 } as SdRequestViewModel;
      const spy = jest.spyOn(router, 'navigate');

      component.redirectToSdRequestPage(employee);

      expect(spy).toHaveBeenCalledWith(['/tickets', 'sd-requests', 123]);
    });
  });
});
