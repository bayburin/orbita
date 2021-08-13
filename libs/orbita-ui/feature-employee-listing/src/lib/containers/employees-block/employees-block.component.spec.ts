import { LazyLoadEvent } from 'primeng/api';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { EmployeesBlockComponent } from './employees-block.component';
import { EmployeeFacade, EmployeeFacadeStub } from '@orbita/orbita-ui/domain-logic';

describe('EmployeesBlockComponent', () => {
  let component: EmployeesBlockComponent;
  let fixture: ComponentFixture<EmployeesBlockComponent>;
  let employeeFacade: EmployeeFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesBlockComponent],
      providers: [{ provide: EmployeeFacade, useClass: EmployeeFacadeStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesBlockComponent);
    component = fixture.componentInstance;
    employeeFacade = TestBed.inject(EmployeeFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('tableChanged()', () => {
    it('should call search() method', () => {
      const spy = jest.spyOn(employeeFacade, 'search');
      const filters = { foo: 'bar' };

      component.tableChanged({ filters } as LazyLoadEvent);

      expect(spy).toHaveBeenCalledWith(filters);
    });
  });

  describe('ngOnDestroy()', () => {
    it('should call clearEmployeeShortEntities() method', () => {
      const spy = jest.spyOn(employeeFacade, 'clearEmployeeShortEntities');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });
  });
});
