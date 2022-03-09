import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input, OnInit, ViewChild } from '@angular/core';
import { QuestionPermission, Attachment, QuestionVM, TicketVM, Tag } from '@orbita/service-desk-ui/domain-logic';

import { toggleAnswer } from './../../animations/toggle-answer.animation';
import { showFlagRight } from './../../animations/show-flag-right.animation';

@Component({
  selector: 'lib-admin-question',
  templateUrl: './admin-question.component.html',
  styleUrls: ['./admin-question.component.scss'],
  animations: [toggleAnswer, showFlagRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminQuestionComponent {
  permission = QuestionPermission;
  linkAnimation = 'hide';
  open = false;

  get ticket(): TicketVM {
    return this.question.ticket;
  }

  /**
   * Вопрос
   */
  @Input() question: QuestionVM;
  /**
   * Список id файлов, которые загружаются в данный момент
   */
  @Input() attachmentLoadingIds: number[];
  /**
   * Флаг, определяющий, загружены ли данные об ответственных
   */
  @Input() employeeLoaded: boolean;
  /**
   * Событие загрузки файла
   */
  @Output() downloadAttachment = new EventEmitter<Attachment>();
  /**
   * Событие публикации вопроса
   */
  @Output() publish = new EventEmitter<void>();
  /**
   * Событие удаления опубликованного вопроса
   */
  @Output() destroyPublished = new EventEmitter<void>();
  /**
   * Событие удаления черновика
   */
  @Output() destroyDraft = new EventEmitter<void>();

  /**
   * Показывает/скрывает ответ на вопрос
   */
  toggleQuestion(): void {
    this.open = !this.open;
  }

  /**
   * Показывает оригинал
   */
  showOriginal(): void {
    console.log('showOriginal');
  }

  /**
   * Показать исправления
   */
  showCorrection(): void {
    console.log('showCorrection');
  }

  trackByTag(index: number, tag: Tag) {
    return tag.id;
  }
}
