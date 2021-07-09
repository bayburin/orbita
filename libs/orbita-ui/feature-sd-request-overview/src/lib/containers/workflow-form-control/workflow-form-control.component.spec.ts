import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthHelper, AuthHelperStub } from '@iss/ng-auth-center';

import { WorkflowFormControlComponent } from './workflow-form-control.component';

describe('WorkflowFormControlComponent', () => {
  let component: WorkflowFormControlComponent;
  let fixture: ComponentFixture<WorkflowFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [WorkflowFormControlComponent],
      providers: [{ provide: AuthHelper, useClass: AuthHelperStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
