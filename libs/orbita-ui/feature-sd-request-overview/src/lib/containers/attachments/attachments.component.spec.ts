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

  describe('isAttachmentDownloading()', () => {
    it('should return true if attachment is into loading array', () => {
      const attachment = { id: 1 } as Attachment;
      component.loadingAttachments = [1, 2];

      expect(component.isAttachmentDownloading(attachment)).toBeTruthy();
    });

    it('should return false if attachment is not into loading array', () => {
      const attachment = { id: 1 } as Attachment;

      expect(component.isAttachmentDownloading(attachment)).toBeFalsy();
    });
  });

  describe('isAttachmentError()', () => {
    it('should return true if attachment is into error array', () => {
      const attachment = { id: 1 } as Attachment;
      component.errorAttachments = [1, 2];

      expect(component.isAttachmentError(attachment)).toBeTruthy();
    });

    it('should return false if attachment is not into error array', () => {
      const attachment = { id: 1 } as Attachment;

      expect(component.isAttachmentError(attachment)).toBeFalsy();
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
});
