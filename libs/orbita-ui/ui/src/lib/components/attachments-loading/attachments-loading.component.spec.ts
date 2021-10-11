import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Attachment } from '@orbita/orbita-ui/domain-logic';

import { AttachmentsLoadingComponent } from './attachments-loading.component';

describe('AttachmentsLoadingComponent', () => {
  let component: AttachmentsLoadingComponent;
  let fixture: ComponentFixture<AttachmentsLoadingComponent>;
  let attachment: Attachment;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttachmentsLoadingComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsLoadingComponent);
    component = fixture.componentInstance;
    attachment = { id: 1 } as Attachment;
    component.attachment = attachment;
    component.loadingAttachments = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isAttachmentDownloading()', () => {
    it('should return true if attachment is into loading array', () => {
      component.loadingAttachments = [1, 2];

      expect(component.isAttachmentDownloading(attachment)).toBeTruthy();
    });

    it('should return false if attachment is not into loading array', () => {
      expect(component.isAttachmentDownloading(attachment)).toBeFalsy();
    });
  });
});
