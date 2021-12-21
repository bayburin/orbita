import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaseBlockComponent } from './kase-block.component';

describe('KaseBlockComponent', () => {
  let component: KaseBlockComponent;
  let fixture: ComponentFixture<KaseBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KaseBlockComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
