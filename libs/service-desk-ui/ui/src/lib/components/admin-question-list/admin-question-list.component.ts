import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

import { Attachment, QuestionVM } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-admin-question-list',
  templateUrl: './admin-question-list.component.html',
  styleUrls: ['./admin-question-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminQuestionListComponent {
  /**
   * Список вопросов
   */
  @Input() questions: QuestionVM[];
  /**
   * Список id файлов, которые загружаются в данный момент
   */
  @Input() attachmentLoadingIds: number[];
  /**
   * Флаг, определяющий, загружены ли данные об ответственных
   */
  @Input() employeeLoaded: boolean;
  /**
   * Событие публикации вопроса
   */
  @Output() publish = new EventEmitter<QuestionVM>();
  /**
   * Событие удаления опубликованного вопроса
   */
  @Output() destroyPublished = new EventEmitter<QuestionVM>();
  /**
   * Событие удаления черновика
   */
  @Output() destroyDraft = new EventEmitter<QuestionVM>();
  /**
   * Событие загрузки файла
   */
  @Output() downloadAttachment = new EventEmitter<Attachment>();

  trackByQuestion(index: number, question: QuestionVM) {
    return question.id;
  }
}
