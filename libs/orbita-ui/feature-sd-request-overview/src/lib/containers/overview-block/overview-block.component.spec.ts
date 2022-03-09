import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import {
  SdRequestFacade,
  SdRequestFacadeStub,
  EmployeeFacade,
  EmployeeFacadeStub,
  SvtFacade,
  SvtFacadeStub,
  AuthCenterFacade,
  AuthCenterFacadeStub,
  UserFacade,
  UserFacadeStub,
  MessageFacade,
  MessageFacadeStub,
  ServiceDeskFacade,
  ServiceDeskFacadeStub,
} from '@orbita/orbita-ui/domain-logic';
import { DatetimePipe } from '@orbita/orbita-ui/ui';
import { ConfirmationService } from 'primeng/api';

import { OverviewBlockComponent } from './overview-block.component';

@Component({})
class ExampleComponent {}

describe('OverviewBlockComponent', () => {
  let component: OverviewBlockComponent;
  let fixture: ComponentFixture<OverviewBlockComponent>;
  let sdRequestFacade: SdRequestFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'tickets', component: ExampleComponent }]),
        ReactiveFormsModule,
      ],
      declarations: [OverviewBlockComponent, DatetimePipe, ExampleComponent],
      providers: [
        { provide: SdRequestFacade, useClass: SdRequestFacadeStub },
        { provide: ServiceDeskFacade, useClass: ServiceDeskFacadeStub },
        { provide: EmployeeFacade, useClass: EmployeeFacadeStub },
        { provide: SvtFacade, useClass: SvtFacadeStub },
        { provide: AuthCenterFacade, useClass: AuthCenterFacadeStub },
        { provide: UserFacade, useClass: UserFacadeStub },
        { provide: MessageFacade, useClass: MessageFacadeStub },
        ConfirmationService,
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

  describe('createComment()', () => {
    it('should call createComment() method', () => {
      component.id = 123;
      const messageFacade = TestBed.inject(MessageFacade);
      const spy = jest.spyOn(messageFacade, 'createComment');

      component.createComment('test');

      expect(spy).toHaveBeenCalledWith(123, 'test');
    });
  });

  describe('toggleEditMode()', () => {
    it('should call toggleEditMode() method', () => {
      const spy = jest.spyOn(sdRequestFacade, 'toggleEditMode');

      component.toggleEditMode();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('saveForm()', () => {
    it('should call updateForm() method', () => {
      const spy = jest.spyOn(sdRequestFacade, 'updateForm');

      component.saveForm();

      expect(spy).toHaveBeenCalled();
    });

    it('should not call updateForm() if form is invalid', () => {
      const spy = jest.spyOn(sdRequestFacade, 'updateForm');
      // component.form.controls['description'].setErrors({ incorrect: true });
      component.form.controls['priority'].setErrors({ incorrect: true });
      component.saveForm();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  // describe('reinitForm()', () => {
  //   it('should call reinitUpdateForm() method', () => {
  //     const spy = jest.spyOn(sdRequestFacade, 'reinitUpdateForm');

  //     component.reinitForm();

  //     expect(spy).toHaveBeenCalled();
  //   });
  // });

  describe('navigateToSdRequests()', () => {
    it('should call updateForm() method', () => {
      const router = TestBed.inject(Router);
      const spy = jest.spyOn(router, 'navigate');

      component.navigateToSdRequests();

      expect(spy).toHaveBeenCalledWith(['/tickets']);
    });
  });

  describe('ngOnDestroy()', () => {
    it('should call unsubscribe() method', () => {
      const spy = jest.spyOn(component.subscriptions, 'unsubscribe');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });

    it('should call clearSelected() method', () => {
      const spy = jest.spyOn(sdRequestFacade, 'clearSelected');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });
  });
});
