import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { EmployeeApi } from './employee.api';

describe('EmployeeApi', () => {
  let service: EmployeeApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EmployeeApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(EmployeeApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadNotifications()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/employees`;
    const employees = [{ id: 5 }];

    it('should return notifications', () => {
      service.queryByTns([5, 6]).subscribe((result) => {
        expect(result).toEqual(employees);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}?filters=%7B%22tns%22:%5B5,6%5D%7D`,
        })
        .flush(employees);
    });
  });
});
