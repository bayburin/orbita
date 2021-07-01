import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketLayoutPageComponent } from './ticket-layout-page.component';

describe('TicketLayoutPageComponent', () => {
  let component: TicketLayoutPageComponent;
  let fixture: ComponentFixture<TicketLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketLayoutPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
