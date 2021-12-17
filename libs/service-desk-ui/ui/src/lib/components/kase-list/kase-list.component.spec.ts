import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaseListComponent } from './kase-list.component';

describe('KaseListComponent', () => {
  let component: KaseListComponent;
  let fixture: ComponentFixture<KaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KaseListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaseListComponent);
    component = fixture.componentInstance;
    component.kases = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
