import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Attachment, AttachmentFacade, SdRequestViewModel } from '@orbita/orbita-ui/domain-logic';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'lib-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent implements OnInit, OnDestroy {
  loadingAttachments$ = this.attachmentFacade.loadingIds$;
  loadingAttachments: number[];
  errorAttachments$ = this.attachmentFacade.errorIds$;
  errorAttachments: number[];
  loadingAttachmentsSub: Subscription;
  errorAttachmentsSub: Subscription;
  @Input() sdRequest: SdRequestViewModel;
  @Input() editMode: boolean;
  @Input() attachmentsForm: FormArray;

  constructor(private attachmentFacade: AttachmentFacade) {}

  ngOnInit(): void {
    this.loadingAttachmentsSub = this.loadingAttachments$.subscribe((ids) => (this.loadingAttachments = ids));
    this.errorAttachmentsSub = this.errorAttachments$.subscribe((ids) => (this.errorAttachments = ids));
  }

  ngOnDestroy(): void {
    this.loadingAttachmentsSub.unsubscribe();
    this.errorAttachmentsSub.unsubscribe();
  }

  trackByAttachment(index: number, attachment: Attachment): number {
    return attachment.id;
  }

  /**
   * Скачивает файл
   */
  downloadAttachment(attachment: Attachment): void {
    this.attachmentFacade.download(attachment);
  }

  /**
   * Проверяет, скачивается ли файл в данный момент
   *
   * @param attachment - файл
   */
  isAttachmentDownloading(attachment: Attachment): boolean {
    return this.loadingAttachments.indexOf(attachment.id) !== -1;
  }

  /**
   * Проверяет, появилась ли ошибка при скачивании файла
   *
   * @param attachment - файл
   */
  isAttachmentError(attachment: Attachment): boolean {
    return this.errorAttachments.indexOf(attachment.id) !== -1;
  }
}
