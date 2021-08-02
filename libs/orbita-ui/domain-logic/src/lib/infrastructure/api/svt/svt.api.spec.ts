import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ORBITA_UI_ENV_TOKEN, orbitaUiEnvironmentStub } from '@orbita/shared/environment';

import { SvtApi } from './svt.api';

describe('SvtApi', () => {
  let service: SvtApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SvtApi,
        {
          provide: ORBITA_UI_ENV_TOKEN,
          useValue: orbitaUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(SvtApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showItem()', () => {
    const api = `${orbitaUiEnvironmentStub.serverApiUrl}/svt/find_by_barcode/123`;
    const item = { item_id: 1 };

    it('should return free_sd_request_types', () => {
      service.showItem(123).subscribe((result) => {
        expect(result).toEqual(item);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: api,
        })
        .flush(item);
    });
  });

  describe('queryItems()', () => {
    const api = `${orbitaUiEnvironmentStub.serverApiUrl}/svt/items`;
    const items = [{ item_id: 1 }];

    it('should return free_sd_request_types', () => {
      service.queryItems({}).subscribe((result) => {
        expect(result).toEqual(items);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}?filters=%7B%7D`,
        })
        .flush(items);
    });
  });
});
