import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Attachment } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-attachments-loading',
  templateUrl: './attachments-loading.component.html',
  styleUrls: ['./attachments-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachmentsLoadingComponent {
  @Input() attachment: Attachment;
  @Input() loadingAttachments: number[];
  @Output() downloadAttachment = new EventEmitter<void>();

  /**
   * Проверяет, скачивается ли файл в данный момент
   *
   * @param attachment - файл
   */
  isAttachmentDownloading(attachment: Attachment): boolean {
    return this.loadingAttachments.indexOf(attachment.id) !== -1;
  }
}
