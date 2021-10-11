import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { WorkflowsComponent } from './workflows.component';

describe('WorkflowsComponent', () => {
  let component: WorkflowsComponent;
  let fixture: ComponentFixture<WorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsComponent);
    component = fixture.componentInstance;
    component.workflows = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
