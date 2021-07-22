import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CmsStatuses, getViewModelCmsStatuses } from '@orbita/orbita-ui/domain-logic';

import { CmsStatusComponent } from './cms-status.component';

describe('CmsStatusComponent', () => {
  let component: CmsStatusComponent;
  let fixture: ComponentFixture<CmsStatusComponent>;
  const cmsStatus = CmsStatuses.INST;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmsStatusComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsStatusComponent);
    component = fixture.componentInstance;
    component.status = cmsStatus;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cmsStatusVm should call getViewModelCmsStatuses() function and return result', () => {
    expect(component.cmsStatusVm).toEqual(getViewModelCmsStatuses(cmsStatus));
  });
});
