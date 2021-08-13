import { FormGroup, FormControl } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Attachment, AttachmentFacade, AttachmentFacadeStub, SdRequestViewModel } from '@orbita/orbita-ui/domain-logic';

import { AttachmentsComponent } from './attachments.component';

describe('AttachmentsComponent', () => {
  let component: AttachmentsComponent;
  let fixture: ComponentFixture<AttachmentsComponent>;
  let attachmentFacade: AttachmentFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttachmentsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AttachmentFacade, useClass: AttachmentFacadeStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsComponent);
    component = fixture.componentInstance;
    component.sdRequest = { attachments: [] } as SdRequestViewModel;
    component.editMode = false;
    attachmentFacade = TestBed.inject(AttachmentFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('downloadAttachment()', () => {
    it('should call download() method', () => {
      const attachment = { id: 1 } as Attachment;
      const spy = jest.spyOn(attachmentFacade, 'download');

      component.downloadAttachment(attachment);

      expect(spy).toHaveBeenCalledWith(attachment);
    });
  });

  describe('markForDestruction()', () => {
    it('should set true value into _destroy attribute', () => {
      const attachment = new FormGroup({
        _destroy: new FormControl(false),
      });

      component.markForDestruction(attachment);

      expect(attachment.get('_destroy').value).toBe(true);
    });
  });

  describe('demarkForDestruction()', () => {
    it('should set true value into _destroy attribute', () => {
      const attachment = new FormGroup({
        _destroy: new FormControl(true),
      });

      component.demarkForDestruction(attachment);

      expect(attachment.get('_destroy').value).toBe(false);
    });
  });

  describe('ngOnDestroy()', () => {
    it('should call unsubscribe() method', () => {
      const spy = jest.spyOn(component.subscriptions, 'unsubscribe');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });
  });
});
