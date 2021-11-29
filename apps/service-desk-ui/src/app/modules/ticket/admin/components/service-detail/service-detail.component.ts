import { Component, Input, ViewChildren, QueryList } from '@angular/core';

import { toggleAnswer } from '../../../animations/toggle-answer.animation';
import { Service } from '../../../models/service/service.model';
import { contentBlockAnimation } from '../../../../../core/animations/content.animation';
import { QuestionComponent } from '../question/question.component';
import { Question } from '../../../models/question/question.model';

@Component({
  selector: 'service-desk-ui-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.sass'],
  animations: [contentBlockAnimation, toggleAnswer],
})
export class ServiceDetailComponent {
  toggleFilters = false;
  showOnlyMyQuestions = localStorage.getItem('showOnlyMyQuestions') === 'true';
  @Input() service: Service;
  @ViewChildren(QuestionComponent) questionTemplateComponent: QueryList<QuestionComponent>;

  trackByQuestion(index: number, question: Question) {
    return question.correction ? question.correction : question;
  }

  toggleshowOnlyMyQuestions(): void {
    this.showOnlyMyQuestions = !this.showOnlyMyQuestions;
    localStorage.setItem('showOnlyMyQuestions', `${this.showOnlyMyQuestions}`);
  }
}
