import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { CategoryApi } from './category.api';

describe('CategoryApi', () => {
  let service: CategoryApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CategoryApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(CategoryApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/categories`;
    const categories = [{ id: 1 }, { id: 2 }];

    it('should return requests', () => {
      service.query().subscribe((result) => {
        expect(result).toEqual(categories);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: api,
        })
        .flush(categories);
    });
  });

  describe('show()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/categories/1`;
    const category = { id: 1 };

    it('should return request', () => {
      service.show(1).subscribe((result) => {
        expect(result).toEqual(category);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: api,
        })
        .flush(category);
    });
  });
});
