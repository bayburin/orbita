import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kase } from '@orbita/service-desk-ui/domain-logic';
import { KaseCardComponent } from './kase-card.component';

describe('KaseCardComponent', () => {
  let component: KaseCardComponent;
  let fixture: ComponentFixture<KaseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KaseCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaseCardComponent);
    component = fixture.componentInstance;
    component.kase = { runtime: {} } as Kase;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
