import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Statuses, getViewModelStatus } from '@orbita/orbita-ui/domain-logic';

import { TicketStatusComponent } from './ticket-status.component';

describe('TicketStatusComponent', () => {
  let component: TicketStatusComponent;
  let fixture: ComponentFixture<TicketStatusComponent>;
  const status = Statuses.AT_WORK;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketStatusComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketStatusComponent);
    component = fixture.componentInstance;
    component.status = status;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('statusVm()', () => {
    it('should call getViewModelPriority() function', () => {
      expect(component.statusVm(status)).toEqual(getViewModelStatus(status));
    });
  });
});
