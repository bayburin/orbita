import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { AdminCategoryApi } from './admin-category.api';
import { Category } from '../../../../entities/models/category.interface';

describe('AdminCategoryApi', () => {
  let service: AdminCategoryApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AdminCategoryApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(AdminCategoryApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/admin/categories`;
    const categories = [{ id: 1 }, { id: 2 }];

    it('should return categories', () => {
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
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/admin/categories/1`;
    const category = { id: 1 };

    it('should return category', () => {
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

  describe('save()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/admin/categories`;
    const recommendation = { name: 'test' } as Category;

    it('should save record', () => {
      service.save(recommendation).subscribe((result) => expect(result).toEqual(recommendation));

      httpMock
        .expectOne({
          method: 'POST',
          url: api,
        })
        .flush(recommendation);
    });
  });
});
