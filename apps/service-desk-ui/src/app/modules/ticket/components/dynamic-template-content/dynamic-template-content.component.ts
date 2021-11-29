import { ComponentFactory } from '@angular/core';
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

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    // const factories = Array.from(this.componentFactoryResolver['_factories'].keys());
    // const factoryClass = factories.find((factory: any) => factory.name === this.data.pageComponent()) as Type<any>;
    const factories = Array.from((this.componentFactoryResolver as any)['_factories'].values());
    const componentFactory = factories.find(
      (factory: any) => factory.selector === this.data.pageComponent()
    ) as ComponentFactory<any>;

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
