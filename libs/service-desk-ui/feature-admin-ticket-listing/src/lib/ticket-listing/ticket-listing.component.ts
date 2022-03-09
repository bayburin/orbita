import { Component, OnInit } from '@angular/core';
import {
  AdminQuestionFacade,
  AdminServiceFacade,
  AttachmentFacade,
  EmployeeFacade,
  QuestionVM,
} from '@orbita/service-desk-ui/domain-logic';
import { ConfirmationService } from 'primeng/api';
import { contentBlockAnimation, toggleAnswer } from '@orbita/service-desk-ui/ui';

@Component({
  selector: 'service-desk-ui-admin-ticket-listing-ticket-listing',
  templateUrl: './ticket-listing.component.html',
  styleUrls: ['./ticket-listing.component.scss'],
  animations: [contentBlockAnimation, toggleAnswer],
})
export class TicketListingComponent implements OnInit {
  service$ = this.adminServiceFacade.selected$;
  loading$ = this.adminServiceFacade.loading$;
  loaded$ = this.adminServiceFacade.loaded$;
  employeeLoaded$ = this.employeeFacade.loaded$;
  attachmentLoadingIds$ = this.attachmentFacade.loadingIds$;

  constructor(
    private adminServiceFacade: AdminServiceFacade,
    private adminQuestionFacade: AdminQuestionFacade,
    private employeeFacade: EmployeeFacade,
    private attachmentFacade: AttachmentFacade,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.adminServiceFacade.show();
  }

  /**
   * Опубликовывает вопрос
   *
   * @param question - вопрос
   */
  publish(question: QuestionVM): void {
    this.confirmationService.confirm({
      message: `Вы действительно хотите опубликовать вопрос №${question.ticket.identity} "${question.ticket.name}?"`,
      header: 'Подтверждение публикации',
      accept: () => this.adminQuestionFacade.publish(question.id),
    });
  }

  /**
   * Удаляет опубликованный вопрос
   *
   * @param question - вопрос
   */
  destroyPublished(question: QuestionVM): void {
    this.confirmationService.confirm({
      message: `Вы действительно хотите удалить вопрос №${question.ticket.identity} "${question.ticket.name}?"`,
      header: 'Подтверждение удаления',
      accept: () => this.adminQuestionFacade.destroyPublished(question.id),
    });
  }

  /**
   * Удаляет черновой вопрос
   *
   * @param question - вопрос
   */
  destroyDraft(question: QuestionVM): void {
    this.confirmationService.confirm({
      message: `Вы действительно хотите удалить черновик №${question.ticket.identity} "${question.ticket.name}?"`,
      header: 'Подтверждение удаления',
      accept: () => this.adminQuestionFacade.destroyDraft(question.id),
    });
  }
}
