import {
  Component,
  AfterViewInit,
  Input,
  ViewContainerRef,
  ViewChild,
  OnDestroy,
  ComponentRef,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { SearchResultTypes, Attachment } from '@orbita/service-desk-ui/domain-logic';
import { CategoryComponent } from '../category/category.component';
import { ServiceComponent } from './../service/service.component';
import { QuestionComponent } from '../question/question.component';
import { SearchResultQuestionComponent } from './../search-result-question/search-result-question.component';

type componentTypes = CategoryComponent | ServiceComponent | QuestionComponent | SearchResultQuestionComponent;

@Component({
  selector: 'lib-search-result-template',
  templateUrl: './search-result-template.component.html',
  styleUrls: ['./search-result-template.component.scss'],
})
export class SearchResultTemplateComponent implements AfterViewInit, OnDestroy {
  /**
   * Найденная категория, услуга или вопрос
   */
  @Input() searchResult: SearchResultTypes;
  /**
   * Режим, при котором ответ на вопрос не выдается, только вопрос с наименованием услуги и ссылка на него
   */
  @Input() standaloneLink: boolean;
  /**
   * Список id файлов, которые загружаются в данный момент
   */
  @Input() set attachmentLoadingIds(ids: number[]) {
    setTimeout(() => {
      if (this.isQuestionComponent(this.componentInstance)) {
        this.componentInstance.attachmentLoadingIds = ids;
        this.componentInstance.cdr.markForCheck();
      }
    }, 0);
  }
  /**
   * Флаг, определяющий, загружены ли данные об ответственных
   */
  @Input() set employeeLoaded(loaded: boolean) {
    setTimeout(() => {
      if (this.isQuestionComponent(this.componentInstance)) {
        this.componentInstance.employeeLoaded = loaded;
      }
    }, 0);
  }
  /**
   * Событие обновления рейтинга
   */
  @Output() upRating = new EventEmitter<void>();
  /**
   * Событие загрузки файла
   */
  @Output() downloadAttachment = new EventEmitter<Attachment>();
  @ViewChild('templateContainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  componentRef: ComponentRef<componentTypes>;
  componentInstance: componentTypes;
  subscriptions = new Subscription();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.entry.clear();

    if ('category_id' in this.searchResult) {
      // Услуга
      this.componentRef = this.entry.createComponent(ServiceComponent);
    } else if ('ticket' in this.searchResult) {
      // Вопрос
      this.componentRef = this.standaloneLink
        ? this.entry.createComponent(SearchResultQuestionComponent)
        : this.entry.createComponent(QuestionComponent);
    } else {
      // Категория
      this.componentRef = this.entry.createComponent(CategoryComponent);
    }

    this.componentInstance = this.componentRef.instance;
    this.componentInstance.data = this.searchResult;
    this.cdr.markForCheck();

    if (this.isQuestionComponent(this.componentInstance)) {
      this.subscriptions.add(this.componentInstance.upRating.subscribe(() => this.upRating.emit()));
      this.subscriptions.add(
        this.componentInstance.downloadAttachment.subscribe((attachment) => this.downloadAttachment.emit(attachment))
      );
    }
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
    this.subscriptions.unsubscribe();
  }

  private isQuestionComponent(component: componentTypes): component is QuestionComponent {
    return component instanceof QuestionComponent;
  }
}
