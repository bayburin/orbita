import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ORBITA_UI_ENV_TOKEN } from '@orbita/shared/environment';

import { SdRequestApi } from './sd-request.api';

describe('SdRequestApi', () => {
  let service: SdRequestApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SdRequestApi,
        { provide: ORBITA_UI_ENV_TOKEN, useValue: { serverApiUrl: 'http://test'  } }
      ]
    });

    service = TestBed.inject(SdRequestApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#query', () => {
    const api = 'http://test/sd_requests';
    const sdRequests = [{ id: 1 }, { id: 2 }];

    it('should return requests', () => {
      service.query(1, 2).subscribe(result => {
        expect(result).toEqual(sdRequests);
      })

      httpMock.expectOne({
        method: 'GET',
        url: `${api}?page=1&perPage=2`
      }).flush(sdRequests);
    });
  });
});
