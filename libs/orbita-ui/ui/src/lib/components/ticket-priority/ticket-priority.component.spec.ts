import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Priorities, getViewModelPriority } from '@orbita/orbita-ui/domain-logic';

import { TicketPriorityComponent } from './ticket-priority.component';

describe('TicketPriorityComponent', () => {
  let component: TicketPriorityComponent;
  let fixture: ComponentFixture<TicketPriorityComponent>;
  const priority = Priorities.DEFAULT;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketPriorityComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPriorityComponent);
    component = fixture.componentInstance;
    component.priority = priority;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('priorityVm()', () => {
    it('should call getViewModelPriority() function', () => {
      expect(component.priorityVm(priority)).toEqual(getViewModelPriority(priority));
    });
  });
});
