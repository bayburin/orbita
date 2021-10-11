import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { OverviewPageComponent } from './overview-page.component';

describe('OverviewPageComponent', () => {
  let component: OverviewPageComponent;
  let fixture: ComponentFixture<OverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
