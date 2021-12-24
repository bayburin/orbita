import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Attachment } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachmentListComponent {
  /**
   * Список файлов
   */
  @Input() attachments: Attachment[];
  /**
   * Список id файлов, которые загружаются в данный момент
   */
  @Input() attachmentLoadingIds: number[];
  /**
   * Событие загрузки файла
   */
  @Output() download = new EventEmitter<Attachment>();

  trackByAttachment(index: number, attachment: Attachment) {
    return attachment.id;
  }
}
