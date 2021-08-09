import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewSdRequestViewForm, SdRequestFacade, SdRequestFacadeStub } from '@orbita/orbita-ui/domain-logic';

import { NewSdRequestPreviewComponent } from './new-sd-request-preview.component';

describe('NewSdRequestPreviewComponent', () => {
  let component: NewSdRequestPreviewComponent;
  let fixture: ComponentFixture<NewSdRequestPreviewComponent>;
  let sdRequestFacade: SdRequestFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewSdRequestPreviewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: SdRequestFacade, useClass: SdRequestFacadeStub }, DynamicDialogRef, DynamicDialogConfig],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSdRequestPreviewComponent);
    component = fixture.componentInstance;
    sdRequestFacade = TestBed.inject(SdRequestFacade);
    const configMock = {
      data: {
        form: { description: 'test' } as NewSdRequestViewForm,
      },
    };
    component.sdRequest = configMock.data.form;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createForm()', () => {
    it('should call createForm() method', () => {
      const spy = jest.spyOn(sdRequestFacade, 'createForm');

      component.saveForm();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('returnToForm()', () => {
    it('should call close() method', () => {
      const ref = TestBed.inject(DynamicDialogRef);
      const spy = jest.spyOn(ref, 'close');

      component.returnToForm();

      expect(spy).toHaveBeenCalled();
    });
  });
});
