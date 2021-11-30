import { ComponentFactory, Type } from '@angular/core';
import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';

import { Category } from '../../models/category/category.model';
import { Service } from '../../models/service/service.model';
import { Ticket } from '../../models/ticket/ticket.model';
import { CategoryPageContentComponent } from './../category-page-content/category-page-content.component';
import { ServicePageContentComponent } from './../service-page-content/service-page-content.component';
import { QuestionPageContentComponent } from './../question-page-content/question-page-content.component';
import { ClaimFormPageContentComponent } from './../claim-form-page-content/claim-form-page-content.component';

@Component({
  selector: 'service-desk-ui-dynamic-template-content',
  templateUrl: './dynamic-template-content.component.html',
  styleUrls: ['./dynamic-template-content.component.scss'],
})
export class DynamicTemplateContentComponent implements OnInit, OnDestroy {
  @Input() data: Category | Service | Ticket;
  @Input() standaloneLink: boolean;
  @Input() showFlags: boolean;
  @ViewChild('templateContainer', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
  componentRef: any;
  selectorMapper: any = {
    Category: CategoryPageContentComponent,
    Service: ServicePageContentComponent,
    Question: QuestionPageContentComponent,
    ClaimForm: ClaimFormPageContentComponent,
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    // const factories = Array.from(this.componentFactoryResolver['_factories'].keys());
    // const factoryClass = factories.find((factory: any) => factory.name === this.data.pageComponent()) as Type<any>;

    // Было до 9 версии ангуляра
    // const factories = Array.from((this.componentFactoryResolver as any)['_factories'].values());
    // const componentFactory = factories.find(
    //   (factory: any) => factory.selector === this.data.pageComponent()
    // ) as ComponentFactory<any>;

    this.data.pageComponent as any;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.selectorMapper[this.data.constructor.name]
    );

    this.entry.clear();
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(factoryClass);
    this.componentRef = this.entry.createComponent(componentFactory);
    this.componentRef.instance.data = this.data;
    this.componentRef.instance.showFlags = this.showFlags;
    this.componentRef.instance.standaloneLink = this.standaloneLink;
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
