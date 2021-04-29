import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TicketsPageComponent } from './tickets-page.component';

describe('TicketsPageComponent', () => {
  let component: TicketsPageComponent;
  let fixture: ComponentFixture<TicketsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketsPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
