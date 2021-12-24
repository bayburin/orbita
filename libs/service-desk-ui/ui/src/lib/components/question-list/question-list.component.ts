import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter,
} from '@angular/core';

import { Attachment, QuestionVM } from '@orbita/service-desk-ui/domain-logic';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'lib-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionListComponent {
  /**
   * Список вопросов
   */
  @Input() questions: QuestionVM[];
  /**
   * Список id файлов, которые загружаются в данный момент
   */
  @Input() attachmentLoadingIds: number[];
  /**
   * Событие загрузки файла
   */
  @Output() downloadAttachment = new EventEmitter<Attachment>();
  /**
   * Событие обновления рейтинга
   */
  @Output() upRating = new EventEmitter<QuestionVM>();
  @ViewChildren(QuestionComponent) questionComponents: QueryList<QuestionComponent>;

  trackByQuestion(index: number, question: QuestionVM) {
    return question.id;
  }
}
