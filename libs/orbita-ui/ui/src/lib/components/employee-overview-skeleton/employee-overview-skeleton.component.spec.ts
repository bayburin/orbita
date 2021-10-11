import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { EmployeeOverviewSkeletonComponent } from './employee-overview-skeleton.component';

describe('EmployeeOverviewSkeletonComponent', () => {
  let component: EmployeeOverviewSkeletonComponent;
  let fixture: ComponentFixture<EmployeeOverviewSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeOverviewSkeletonComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeOverviewSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
