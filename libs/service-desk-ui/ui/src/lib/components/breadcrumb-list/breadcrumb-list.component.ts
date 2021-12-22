import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { breadcrumbAnimation } from './../../animations/breadcrumb.animation';

@Component({
  selector: 'lib-breadcrumb-list',
  templateUrl: './breadcrumb-list.component.html',
  styleUrls: ['./breadcrumb-list.component.scss'],
  animations: [breadcrumbAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbListComponent {
  /**
   * Список "хлебных крошек"
   */
  @Input() breadcrumbs: MenuItem[];

  trackByBreadcrumb(index: number, breadcrumb: MenuItem) {
    return breadcrumb.routerLink;
  }
}
