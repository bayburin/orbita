import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  UserRecommendationFacade,
  UserRecommendationFacadeStub,
  DashboardFacade,
  DashboardFacadeStub,
} from '@orbita/service-desk-ui/domain-logic';
import { HomeBlockComponent } from './home-block.component';

describe('HomeBlockComponent', () => {
  let component: HomeBlockComponent;
  let fixture: ComponentFixture<HomeBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeBlockComponent],
      providers: [
        { provide: DashboardFacade, useClass: DashboardFacadeStub },
        { provide: UserRecommendationFacade, useClass: UserRecommendationFacadeStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
