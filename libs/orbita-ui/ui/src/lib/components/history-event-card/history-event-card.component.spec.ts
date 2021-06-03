import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HistoryViewModel, EventTypeNames } from '@orbita/orbita-ui/domain-logic';

import { HistoryEventCardComponent } from './history-event-card.component';
import { DatetimePipe } from './../../pipes/datetime/datetime.pipe';

describe('HistoryEventCardComponent', () => {
  let component: HistoryEventCardComponent;
  let fixture: ComponentFixture<HistoryEventCardComponent>;
  const history = {
    id: 1,
    action: 'test action',
    event_type: {
      name: EventTypeNames['OPEN'],
      description: 'test description',
    },
    created_at: 'today',
  } as unknown as HistoryViewModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryEventCardComponent, DatetimePipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryEventCardComponent);
    component = fixture.componentInstance;
    component.history = history;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
