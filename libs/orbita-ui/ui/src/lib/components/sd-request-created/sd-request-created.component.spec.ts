import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SdRequestCreatedComponent } from './sd-request-created.component';

describe('SdRequestCreatedComponent', () => {
  let component: SdRequestCreatedComponent;
  let fixture: ComponentFixture<SdRequestCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SdRequestCreatedComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdRequestCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
