import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BreadcrumbListComponent } from './breadcrumb-list.component';

describe('BreadcrumbListComponent', () => {
  let component: BreadcrumbListComponent;
  let fixture: ComponentFixture<BreadcrumbListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbListComponent);
    component = fixture.componentInstance;
    component.breadcrumbs = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
