import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SourceSnapshot } from '@orbita/orbita-ui/domain-logic';

import { SdRequestDetailsComponent } from './sd-request-details.component';

describe('SdRequestDetailsComponent', () => {
  let component: SdRequestDetailsComponent;
  let fixture: ComponentFixture<SdRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SdRequestDetailsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdRequestDetailsComponent);
    component = fixture.componentInstance;
    component.data = {} as SourceSnapshot;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
