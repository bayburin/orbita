import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { AnswerVM, Attachment, QuestionPermission, QuestionVM } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerListComponent {
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
