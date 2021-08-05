import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewSdRequestViewForm } from '@orbita/orbita-ui/domain-logic';

import { NewSdRequestPreviewComponent } from './new-sd-request-preview.component';

describe('NewSdRequestPreviewComponent', () => {
  let component: NewSdRequestPreviewComponent;
  let fixture: ComponentFixture<NewSdRequestPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewSdRequestPreviewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [DynamicDialogRef, DynamicDialogConfig],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSdRequestPreviewComponent);
    component = fixture.componentInstance;
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

  describe('returnToForm()', () => {
    it('should call close() method', () => {
      const ref = TestBed.inject(DynamicDialogRef);
      const spy = jest.spyOn(ref, 'close');

      component.returnToForm();

      expect(spy).toHaveBeenCalled();
    });
  });
});
