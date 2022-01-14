import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRecommendationFacade, UserRecommendationFacadeStub } from '@orbita/service-desk-ui/domain-logic';

import { UserRecommendationsComponent } from './user-recommendations.component';

describe('UserRecommendationsComponent', () => {
  let component: UserRecommendationsComponent;
  let fixture: ComponentFixture<UserRecommendationsComponent>;
  let userRecommendationFacade: UserRecommendationFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRecommendationsComponent],
      providers: [{ provide: UserRecommendationFacade, useClass: UserRecommendationFacadeStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRecommendationsComponent);
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
