import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CsaStatuses, getViewModelCsaStatuses } from '@orbita/orbita-ui/domain-logic';

import { CsaStatusComponent } from './csa-status.component';

describe('CsaStatusComponent', () => {
  let component: CsaStatusComponent;
  let fixture: ComponentFixture<CsaStatusComponent>;
  const csaStatus = CsaStatuses.INST;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CsaStatusComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsaStatusComponent);
    component = fixture.componentInstance;
    component.status = csaStatus;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('csaStatusVm should call getViewModelCsaStatuses() function and return result', () => {
    expect(component.csaStatusVm).toEqual(getViewModelCsaStatuses(csaStatus));
  });
});
