import { ChangeDetectionStrategy, Component, EventEmitter, Output, ChangeDetectorRef, Input } from '@angular/core';

import { Attachment, QuestionPermission, QuestionVM } from '@orbita/service-desk-ui/domain-logic';
import { AbstractSearchResultComponent } from './../abstract-search-result/abstract-search-result.component';
import { toggleAnswer } from './../../animations/toggle-answer.animation';
import { showFlagRight } from './../../animations/show-flag-right.animation';

@Component({
  selector: 'lib-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [toggleAnswer, showFlagRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent extends AbstractSearchResultComponent<QuestionVM> {
  permission = QuestionPermission;
  linkAnimation = 'hide';
  open = false;
  private wasOpened = false;

  /**
   * Список id файлов, которые загружаются в данный момент
   */
  @Input() attachmentLoadingIds: number[];
  /**
   * Событие обновления рейтинга
   */
  @Output() upRating = new EventEmitter<void>();
  /**
   * Событие загрузки файла
   */
  @Output() downloadAttachment = new EventEmitter<Attachment>();

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  /**
   * Показывает ответ вопрос и отправляет отправляет соответсвующее событие для обновлений рейтинга
   */
  toggleQuestion(): void {
    this.open = !this.open;
    this.cdr.detectChanges();
    if (!this.wasOpened) {
      this.upRating.emit();
    }
    this.wasOpened = true;
  }
}
