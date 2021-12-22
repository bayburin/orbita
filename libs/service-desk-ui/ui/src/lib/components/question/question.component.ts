import { ChangeDetectionStrategy, Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';

import { QuestionOverviewVM, QuestionPermission, QuestionVM } from '@orbita/service-desk-ui/domain-logic';
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
export class QuestionComponent extends AbstractSearchResultComponent<QuestionOverviewVM | QuestionVM> {
  permission = QuestionPermission;
  linkAnimation = 'hide';
  open = false;
  private wasOpened = false;
  /**
   * Вопрос с типом QuestionOverviewVM
   */
  get questionOverview(): QuestionOverviewVM {
    return this.data as QuestionOverviewVM;
  }
  /**
   * Вопрос с типом OverviewVM
   */
  get question(): QuestionVM {
    return this.data as QuestionVM;
  }
  /**
   * Событие обновления рейтинга
   */
  @Output() upRating = new EventEmitter<void>();

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
