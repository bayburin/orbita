import { Attachment } from '@orbita/orbita-ui/domain-logic';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lib-attachments-error',
  templateUrl: './attachments-error.component.html',
  styleUrls: ['./attachments-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachmentsErrorComponent {
  @Input() attachment: Attachment;
  @Input() errorAttachments: number[];

  /**
   * Проверяет, появилась ли ошибка при скачивании файла
   *
   * @param attachment - файл
   */
  isAttachmentError(attachment: Attachment): boolean {
    return this.errorAttachments.indexOf(attachment.id) !== -1;
  }
}
