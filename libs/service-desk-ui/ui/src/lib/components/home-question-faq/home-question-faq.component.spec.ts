import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeQuestionFaqComponent } from './home-question-faq.component';

describe('HomeQuestionFaqComponent', () => {
  let component: HomeQuestionFaqComponent;
  let fixture: ComponentFixture<HomeQuestionFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeQuestionFaqComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeQuestionFaqComponent);
    component = fixture.componentInstance;
    component.services = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
