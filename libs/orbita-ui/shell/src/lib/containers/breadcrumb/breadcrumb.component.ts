import { Component } from '@angular/core';
import { RouterFacade } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'orbita-ui-shell-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  breadCrumbMenu$ = this.routerFacade.breadcrumbMenu$;

  constructor(private routerFacade: RouterFacade) {}
}
