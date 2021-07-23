import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SdRequestViewModel } from '@orbita/orbita-ui/domain-logic';

import { ShowSdRequestComponent } from './show-sd-request.component';

describe('ShowSdRequestComponent', () => {
  let component: ShowSdRequestComponent;
  let fixture: ComponentFixture<ShowSdRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowSdRequestComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSdRequestComponent);
    component = fixture.componentInstance;
    component.sdRequest = { works: [], histories: [] } as SdRequestViewModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
