import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SdRequestViewModel } from '@orbita/orbita-ui/domain-logic';

import { SdRequestDetailsComponent } from './sd-request-details.component';
import { DatetimePipe } from '../../pipes/datetime/datetime.pipe';

describe('SdRequestDetailsComponent', () => {
  let component: SdRequestDetailsComponent;
  let fixture: ComponentFixture<SdRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SdRequestDetailsComponent, DatetimePipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdRequestDetailsComponent);
    component = fixture.componentInstance;
    component.sdRequest = { comments: [], histories: [] } as SdRequestViewModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
