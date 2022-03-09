import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { AnswerVM, Attachment, QuestionPermission, QuestionVM } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-admin-answer-list',
  templateUrl: './admin-answer-list.component.html',
  styleUrls: ['./admin-answer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAnswerListComponent {
  permission = QuestionPermission;
  /**
   * Вопрос
   */
  @Input() question: QuestionVM;
  /**
   * Список id файлов, которые загружаются в данный момент
   */
  @Input() attachmentLoadingIds: number[];
  /**
   * Событие загрузки файла
   */
  @Output() downloadAttachment = new EventEmitter<Attachment>();

  trackByAnswer(index: number, question: AnswerVM) {
    return question.id;
  }
}
