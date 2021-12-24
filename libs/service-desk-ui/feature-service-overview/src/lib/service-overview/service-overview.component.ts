import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { contentBlockAnimation, QuestionComponent, QuestionListComponent } from '@orbita/service-desk-ui/ui';
import {
  QuestionVM,
  ServiceFacade,
  ServicePermission,
  QuestionFacade,
  Attachment,
  AttachmentFacade,
} from '@orbita/service-desk-ui/domain-logic';
@Component({
  selector: 'lib-service-overview',
  templateUrl: './service-overview.component.html',
  styleUrls: ['./service-overview.component.scss'],
  animations: [contentBlockAnimation],
})
export class ServiceOverviewComponent implements OnInit, AfterViewChecked {
  permission = ServicePermission;
  service$ = this.serviceFacade.selected$;
  loading$ = this.serviceFacade.loading$;
  loaded$ = this.serviceFacade.loaded$;
  attachmentLoadingIds$ = this.attachmentFacade.loadingIds$;
  identity = this.route.snapshot.queryParams.identity;
  /**
   * Показывает, открыт ли автоматически выбранный вопрос
   */
  questionOpened = false;
  timeout: number;
  @ViewChild(QuestionListComponent) private questionList: QuestionListComponent;

  constructor(
    private serviceFacade: ServiceFacade,
    private questionFacade: QuestionFacade,
    private attachmentFacade: AttachmentFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.identity = this.route.snapshot.queryParams.identity;
    this.serviceFacade.loadSelected();
  }

  ngAfterViewChecked(): void {
    if (this.identity && this.questionList && !this.questionOpened) {
      const questionComponentArr = this.questionList.questionComponents.toArray();

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.openSelectedQuestion(questionComponentArr), 300);
    }
  }

  /**
   * Увеличивает рейтинг популярности вопроса
   *
   * @param question - вопрос
   */
  upRating(question: QuestionVM) {
    this.questionFacade.upRating(question);
  }

  /**
   * Скачивает файл
   *
   * @param attachment - файл
   */
  downloadAttachment(attachment: Attachment): void {
    this.attachmentFacade.download(attachment);
  }

  /**
   * Вызывает метод toggleQuestion() у компонента для раскрытия вопроса.
   *
   * @param componentArr - массив компонентов, содержащих тикет.
   */
  private openSelectedQuestion(componentArr: QuestionComponent[]): void {
    const selectedComponent = componentArr.find((el) => el.data.ticket.identity == this.identity);

    if (selectedComponent) {
      selectedComponent.toggleQuestion();
      this.questionOpened = true;
      const el = document.getElementById(`${this.identity}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
