import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { UserRecommendationApi } from './user-recommendation.api';
import { UserRecommendation } from './../../../entities/models/user-recommendation.interface';

describe('CategoryApi', () => {
  let service: UserRecommendationApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserRecommendationApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(UserRecommendationApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/user_recommendations`;
    const recommendations = [{ id: 1 }, { id: 2 }];

    it('should return user recommendations', () => {
      service.query().subscribe((result) => {
        expect(result).toEqual(recommendations);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: api,
        })
        .flush(recommendations);
    });
  });

  describe('show()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/user_recommendations/123`;
    const recommendation = { id: 123 };

    it('should show user recommendations', () => {
      service.show(123).subscribe((result) => {
        expect(result).toEqual(recommendation);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: api,
        })
        .flush(recommendation);
    });
  });

  describe('save()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/user_recommendations`;
    const recommendation = { title: 'test' } as UserRecommendation;

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

  describe('update()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/user_recommendations/1`;
    const recommendation = { title: 'test' } as UserRecommendation;

    it('should update record', () => {
      service.update(1, recommendation).subscribe((result) => expect(result).toEqual(recommendation));

      httpMock
        .expectOne({
          method: 'PUT',
          url: api,
        })
        .flush(recommendation);
    });
  });

  describe('destroy()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/user_recommendations/1`;
    const recommendation = { title: 'test' } as UserRecommendation;

    it('should destroy record', () => {
      service.destroy(1).subscribe((result) => expect(result).toEqual(recommendation));

      httpMock
        .expectOne({
          method: 'DELETE',
          url: api,
        })
        .flush(recommendation);
    });
  });

  describe('reorder()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/user_recommendations/reorder`;
    const data = [
      { id: 2, order: 20 },
      { id: 3, order: 30 },
    ];

    it('should update records', () => {
      service.reorder(data).subscribe();

      httpMock.expectOne({
        method: 'PUT',
        url: api,
      });
    });
  });
});
