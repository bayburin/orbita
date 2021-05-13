import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdRequestHistoryOverviewComponent } from './sd-request-history-overview.component';

describe('SdRequestHistoryOverviewComponent', () => {
  let component: SdRequestHistoryOverviewComponent;
  let fixture: ComponentFixture<SdRequestHistoryOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdRequestHistoryOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdRequestHistoryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
