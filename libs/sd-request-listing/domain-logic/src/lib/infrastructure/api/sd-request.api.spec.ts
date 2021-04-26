import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SdRequestApi } from './sd-request.api';

describe('SdRequestApi', () => {
  let service: SdRequestApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(SdRequestApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getSdRequests', () => {
    const api = 'https://orbita-center-dev.iss-reshetnev.ru/api/v1/sd_requests';
    const sd_requests = [{ id: 1 }, { id: 2 }];

    it('should return requests', () => {
      service.getSdRequests().subscribe(result => {
        expect(result).toEqual(sd_requests);
      })

      httpMock.expectOne({
        method: 'GET',
        url: api
      }).flush(sd_requests);
    });
  });
});
