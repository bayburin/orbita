import { Component } from '@angular/core';

import { routeAnimation } from '@orbita/service-desk-ui/ui';

@Component({
  selector: 'service-desk-ui-shell-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routeAnimation],
})
export class LayoutComponent {}
