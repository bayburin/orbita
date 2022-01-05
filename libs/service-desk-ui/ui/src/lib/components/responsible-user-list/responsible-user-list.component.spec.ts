import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleUserListComponent } from './responsible-user-list.component';

describe('ResponsibleUserListComponent', () => {
  let component: ResponsibleUserListComponent;
  let fixture: ComponentFixture<ResponsibleUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [ResponsibleUserListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibleUserListComponent);
    component = fixture.componentInstance;
    component.responsibleUsers = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
