import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryEventCardComponent } from './history-event-card.component';

describe('HistoryEventCardComponent', () => {
  let component: HistoryEventCardComponent;
  let fixture: ComponentFixture<HistoryEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryEventCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
