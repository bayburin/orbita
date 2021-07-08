import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { WorkerFormControlComponent } from './worker-form-control.component';

describe('WorkerFormControlComponent', () => {
  let component: WorkerFormControlComponent;
  let fixture: ComponentFixture<WorkerFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkerFormControlComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
