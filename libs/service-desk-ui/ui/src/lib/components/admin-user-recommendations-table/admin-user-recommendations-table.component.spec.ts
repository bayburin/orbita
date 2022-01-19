import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserRecommendationsTableComponent } from './admin-user-recommendations-table.component';

describe('AdminUserRecommendationsTableComponent', () => {
  let component: AdminUserRecommendationsTableComponent;
  let fixture: ComponentFixture<AdminUserRecommendationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserRecommendationsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserRecommendationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
