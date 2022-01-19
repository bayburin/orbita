import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRecommendationFacade, UserRecommendationFacadeStub } from '@orbita/service-desk-ui/domain-logic';

import { AdminUserRecommendationsComponent } from './admin-user-recommendations.component';

describe('AdminUserRecommendationsComponent', () => {
  let component: AdminUserRecommendationsComponent;
  let fixture: ComponentFixture<AdminUserRecommendationsComponent>;
  let userRecommendationFacade: UserRecommendationFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUserRecommendationsComponent],
      providers: [{ provide: UserRecommendationFacade, useClass: UserRecommendationFacadeStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserRecommendationsComponent);
    component = fixture.componentInstance;
    userRecommendationFacade = TestBed.inject(UserRecommendationFacade);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call loadAll() method', () => {
    jest.spyOn(userRecommendationFacade, 'loadAll');

    fixture.detectChanges();
  });
});
