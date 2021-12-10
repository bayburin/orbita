import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationAlertListComponent } from './notification-alert-list.component';

describe('NotificationAlertListComponent', () => {
  let component: NotificationAlertListComponent;
  let fixture: ComponentFixture<NotificationAlertListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationAlertListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationAlertListComponent);
    component = fixture.componentInstance;
    component.notifications = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
