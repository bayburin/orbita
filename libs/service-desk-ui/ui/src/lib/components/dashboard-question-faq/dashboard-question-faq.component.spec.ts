import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardQuestionFaqComponent } from './dashboard-question-faq.component';

describe('DashboardQuestionFaqComponent', () => {
  let component: DashboardQuestionFaqComponent;
  let fixture: ComponentFixture<DashboardQuestionFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DashboardQuestionFaqComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardQuestionFaqComponent);
    component = fixture.componentInstance;
    component.services = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
