import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  SdRequestFacade,
  SdRequestFacadeStub,
  EmployeeFacade,
  EmployeeFacadeStub,
  SvtFacade,
  SvtFacadeStub,
  AuthCenterFacade,
  AuthCenterFacadeStub,
  ParameterFacade,
  ParameterFacadeStub,
} from '@orbita/orbita-ui/domain-logic';
import { DatetimePipe } from '@orbita/orbita-ui/ui';

import { OverviewBlockComponent } from './overview-block.component';

describe('OverviewBlockComponent', () => {
  let component: OverviewBlockComponent;
  let fixture: ComponentFixture<OverviewBlockComponent>;
  let sdRequestFacade: SdRequestFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [OverviewBlockComponent, DatetimePipe],
      providers: [
        { provide: SdRequestFacade, useClass: SdRequestFacadeStub },
        { provide: EmployeeFacade, useClass: EmployeeFacadeStub },
        { provide: SvtFacade, useClass: SvtFacadeStub },
        { provide: AuthCenterFacade, useClass: AuthCenterFacadeStub },
        { provide: ParameterFacade, useClass: ParameterFacadeStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewBlockComponent);
    component = fixture.componentInstance;
    sdRequestFacade = TestBed.inject(SdRequestFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleEditMode()', () => {
    it('should call toggleEditMode() method', () => {
      const spy = spyOn(sdRequestFacade, 'toggleEditMode');

      component.toggleEditMode();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('saveForm()', () => {
    it('should call updateForm() method', () => {
      const spy = spyOn(sdRequestFacade, 'updateForm');

      component.saveForm();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('navigateToSdRequests()', () => {
    it('should call updateForm() method', () => {
      const router = TestBed.inject(Router);
      const spy = spyOn(router, 'navigate');

      component.navigateToSdRequests();

      expect(spy).toHaveBeenCalledWith(['/tickets']);
    });
  });
});
