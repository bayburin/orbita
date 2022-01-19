import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserRecommendationFormComponent } from './admin-user-recommendation-form.component';

describe('AdminUserRecommendationFormComponent', () => {
  let component: AdminUserRecommendationFormComponent;
  let fixture: ComponentFixture<AdminUserRecommendationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserRecommendationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserRecommendationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
