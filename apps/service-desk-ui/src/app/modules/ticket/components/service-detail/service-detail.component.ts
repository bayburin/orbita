import { Component, Input, ViewChildren, QueryList, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { Service } from '../../models/service/service.model';
// import { DynamicTemplateContentComponent } from '@modules/ticket/components/dynamic-template-content/dynamic-template-content.component';
import { contentBlockAnimation } from '../../../../core/animations/content.animation';
import { ServicePolicy } from '../../../../shared/policies/service/service.policy';
import { Question } from '../../models/question/question.model';
import { QuestionPageContentComponent } from '../question-page-content/question-page-content.component';

@Component({
  selector: 'service-desk-ui-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
  animations: [contentBlockAnimation],
})
export class ServiceDetailComponent implements OnChanges {
  @Input() service: Service;
  // @ViewChildren(DynamicTemplateContentComponent) dynamicTemplateComponent: QueryList<DynamicTemplateContentComponent>;
  @ViewChildren(QuestionPageContentComponent) questionComponent: QueryList<QuestionPageContentComponent>;
  showTicketFlags: boolean;

  constructor(private policy: ServicePolicy) {}

  ngOnChanges(changes: SimpleChanges) {
    const service: SimpleChange = changes.service;

    if (service.currentValue && !service.previousValue) {
      this.showTicketFlags = this.policy.authorize(this.service, 'showFlags');
    }
  }

  trackByTicket(index: number, question: Question) {
    return question.id;
  }
}
