import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllKasesComponent } from './all-kases.component';

describe('AllKasesComponent', () => {
  let component: AllKasesComponent;
  let fixture: ComponentFixture<AllKasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllKasesComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllKasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
