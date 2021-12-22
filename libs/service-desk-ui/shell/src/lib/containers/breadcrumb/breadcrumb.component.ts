import { Component } from '@angular/core';

import { RouterFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  breadcrumbs$ = this.routerFacade.breadcrumbMenu$;

  constructor(private routerFacade: RouterFacade) {}
}
