import { RouterTestingModule } from '@angular/router/testing';
import { LazyLoadEvent } from 'primeng/api';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';

import { EmployeesBlockComponent } from './employees-block.component';
import { EmployeeFacade, EmployeeFacadeStub, EmployeeShort } from '@orbita/orbita-ui/domain-logic';
import { ActivatedRoute, Router } from '@angular/router';

@Component({})
class ExampleComponent {}

// const mockActivatedRoute = {
//   params: {
//     subscribe: jest.fn(),
//   },
// };

describe('EmployeesBlockComponent', () => {
  let component: EmployeesBlockComponent;
  let fixture: ComponentFixture<EmployeesBlockComponent>;
  let employeeFacade: EmployeeFacade;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'employees/:id', component: ExampleComponent },
          { path: 'tickets/new-sd-request', component: ExampleComponent },
        ]),
      ],
      declarations: [EmployeesBlockComponent],
      providers: [
        { provide: EmployeeFacade, useClass: EmployeeFacadeStub },
        // { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesBlockComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    employeeFacade = TestBed.inject(EmployeeFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changeTable()', () => {
    it('should call search() method', () => {
      const spy = jest.spyOn(employeeFacade, 'search');
      const filters = { foo: 'bar' };

      component.changeTable({ filters } as LazyLoadEvent);

      expect(spy).toHaveBeenCalledWith(filters);
    });
  });

  describe('clearTable()', () => {
    it('should call search() method', () => {
      const spy = jest.spyOn(employeeFacade, 'clearEmployeeShortEntities');

      component.clearTable();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy()', () => {
    it('should call clearEmployeeShortEntities() method', () => {
      const spy = jest.spyOn(employeeFacade, 'clearEmployeeShortEntities');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });
  });

  // TODO: Тест не работает
  // describe('redicrectToEmployeePage()', () => {
  //   it('should redirect to employee page', () => {
  //     const employee = { id: 123 } as EmployeeShort;
  //     const spy = jest.spyOn(router, 'navigate');
  //     const route = TestBed.inject(ActivatedRoute);

  //     component.redicrectToEmployeePage(employee);

  //     // console.log(spy.mock.calls[0]);
  //     expect(spy).toHaveBeenCalledWith([123], { relativeTo: route });
  //   });
  // });

  describe('redirectToNewSdRequestPage()', () => {
    it('should redirect to employee page', () => {
      const employee = { id: 123 } as EmployeeShort;
      const spy = jest.spyOn(router, 'navigate');

      component.redirectToNewSdRequestPage(employee);

      expect(spy).toHaveBeenCalledWith(['/tickets', 'new-sd-request'], { queryParams: { id_tn: 123 } });
    });
  });
});
