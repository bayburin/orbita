import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Attachment } from '@orbita/orbita-ui/domain-logic';

import { AttachmentsErrorComponent } from './attachments-error.component';

describe('AttachmentsErrorComponent', () => {
  let component: AttachmentsErrorComponent;
  let fixture: ComponentFixture<AttachmentsErrorComponent>;
  let attachment: Attachment;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttachmentsErrorComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsErrorComponent);
    component = fixture.componentInstance;
    attachment = { id: 1 } as Attachment;
    component.attachment = attachment;
    component.errorAttachments = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
