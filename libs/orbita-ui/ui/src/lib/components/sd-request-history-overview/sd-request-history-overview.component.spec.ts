import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SdRequestViewModel } from '@orbita/orbita-ui/domain-logic';

import { SdRequestHistoryOverviewComponent } from './sd-request-history-overview.component';

describe('SdRequestHistoryOverviewComponent', () => {
  let component: SdRequestHistoryOverviewComponent;
  let fixture: ComponentFixture<SdRequestHistoryOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SdRequestHistoryOverviewComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdRequestHistoryOverviewComponent);
    component = fixture.componentInstance;
    component.sdRequest = { works: [] } as SdRequestViewModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
