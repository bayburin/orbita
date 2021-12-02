import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  UserRecommendationFacade,
  UserRecommendationFacadeStub,
  CategoryFacade,
  CategoryFacadeStub,
  DashboardFacade,
  DashboardFacadeStub,
} from '@orbita/service-desk-ui/domain-logic';
import { DashboardBlockComponent } from './dashboard-block.component';

describe('DashboardBlockComponent', () => {
  let component: DashboardBlockComponent;
  let fixture: ComponentFixture<DashboardBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardBlockComponent],
      providers: [
        { provide: DashboardFacade, useClass: DashboardFacadeStub },
        { provide: UserRecommendationFacade, useClass: UserRecommendationFacadeStub },
        { provide: CategoryFacade, useClass: CategoryFacadeStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
