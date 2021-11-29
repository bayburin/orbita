import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { first, switchMap, finalize } from 'rxjs/operators';

import { QuestionService } from '../../../../shared/services/question/question.service';
import { Ticket } from '../../models/ticket/ticket.model';
import { AnswerAttachmentI } from '../../../../core/interfaces/answer-attachment.interface';
import { toggleAnswer } from '../../animations/toggle-answer.animation';
import { AttachmentService } from '../../../../shared/services/attachment/attachment.service';
import { QuestionPolicy } from '../../../../shared/policies/question/question.policy';
import { showFlagRight } from '../../animations/show-flag-right.animation';
import { Question } from '../../models/question/question.model';
import * as fileSaver from 'file-saver';
import { Answer } from '../../models/answer/answer.model';

@Component({
  selector: 'service-desk-ui-question-page-content',
  templateUrl: './question-page-content.component.html',
  styleUrls: ['./question-page-content.component.scss'],
  animations: [toggleAnswer, showFlagRight],
})
export class QuestionPageContentComponent implements OnInit {
  @Input() data: Question;
  @Input() standaloneLink: boolean;
  @Input() showFlags: boolean;
  ratingStream = new Subject<Ticket>();
  linkAnimation = 'hide';

  constructor(
    private questionService: QuestionService,
    private attachmentService: AttachmentService,
    private policy: QuestionPolicy
  ) {}

  ngOnInit() {
    this.ratingStream
      .pipe(
        first(),
        switchMap(() => this.questionService.raiseRating(this.data))
      )
      .subscribe();

    if (this.showFlags === undefined) {
      this.showFlags = this.policy.authorize(this.data, 'showFlags');
    }
  }

  /**
   * "Раскрывает" вопрос и отправляет запрос на сервер для изменения его рейтинга.
   */
  toggleQuestion(): void {
    if (this.standaloneLink) {
      return;
    }

    this.data.open = !this.data.open;
    this.ratingStream.next();
  }

  /**
   * Загружает выбранный файл с сервера.
   */
  downloadAttachment(attachment: AnswerAttachmentI): void {
    attachment.loadingDownload = true;
    this.attachmentService
      .downloadAttachment(attachment)
      .pipe(finalize(() => (attachment.loadingDownload = false)))
      .subscribe((fileData) => {
        if (fileData.type.match('^image|^application/pdf$')) {
          const url = window.URL.createObjectURL(fileData);

          window.open(url, '_blank');
        } else {
          // const FileSaver = require('file-saver');

          fileSaver.saveAs(fileData, attachment.filename);
        }
      });
  }

  trackByAnswer(index: number, answer: Answer) {
    return answer.id;
  }

  trackByAttachment(index: number, attachment: AnswerAttachmentI) {
    return attachment.id;
  }
}
