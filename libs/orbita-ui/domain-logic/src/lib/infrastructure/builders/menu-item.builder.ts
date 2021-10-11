import { ModelBuilder } from './model.builder';
import { MenuItem } from 'primeng/api';

export class MenuItemBuilder extends ModelBuilder<MenuItem> {
  constructor() {
    super();

    this.model = {};
  }

  label(label: string): MenuItemBuilder {
    this.model.label = label;

    return this;
  }

  routerLink(routerLink: string): MenuItemBuilder {
    this.model.routerLink = routerLink;

    return this;
  }
}
