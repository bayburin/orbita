import {
  Component,
  AfterViewInit,
  Input,
  ViewContainerRef,
  ViewChild,
  OnDestroy,
  ComponentRef,
  ChangeDetectorRef,
} from '@angular/core';

import { SearchResultTypes } from '@orbita/service-desk-ui/domain-logic';
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
  @ViewChild('templateContainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  componentRef: ComponentRef<componentTypes>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.entry.clear();

    if ('category_id' in this.searchResult) {
      this.componentRef = this.entry.createComponent(ServiceComponent);
    } else if ('ticket' in this.searchResult) {
      this.componentRef = this.standaloneLink
        ? this.entry.createComponent(SearchResultQuestionComponent)
        : this.entry.createComponent(QuestionComponent);
    } else {
      this.componentRef = this.entry.createComponent(CategoryComponent);
    }

    const componentInstance = this.componentRef.instance;
    componentInstance.data = this.searchResult;

    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
  }
}
