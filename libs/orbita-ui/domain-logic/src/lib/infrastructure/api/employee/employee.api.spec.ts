import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ORBITA_UI_ENV_TOKEN, orbitaUiEnvironmentStub } from '@orbita/shared/environment';

import { EmployeeApi } from './employee.api';
import { EmployeeFilters } from './../../../entities/models/employee/employee-filters.enum';
import { PrimeFilterFactory } from './../../factories/prime-filter.factory';

describe('Employeepi', () => {
  let service: EmployeeApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EmployeeApi,
        {
          provide: ORBITA_UI_ENV_TOKEN,
          useValue: { serverApiUrl: orbitaUiEnvironmentStub },
        },
      ],
    });

    service = TestBed.inject(EmployeeApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show()', () => {
    const api = `${orbitaUiEnvironmentStub}/employees/1`;
    const employee = { id: 1 };

    it('should return request', () => {
      service.show(1).subscribe((result) => {
        expect(result).toEqual(employee);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: api,
        })
        .flush(employee);
    });
  });

  describe('query()', () => {
    const api = `${orbitaUiEnvironmentStub}/employees`;
    const employees = [{ id: 1 }];
    const filters = PrimeFilterFactory.createFilter(EmployeeFilters.FIO, 'fio');

    it('should return request', () => {
      service.query(filters).subscribe((result) => {
        expect(result).toEqual(employees);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}?filters=%7B%22fullName%22:%7B%22value%22:%22fio%22,%22matchMode%22:%22equals%22%7D%7D`,
        })
        .flush(employees);
    });
  });
});
