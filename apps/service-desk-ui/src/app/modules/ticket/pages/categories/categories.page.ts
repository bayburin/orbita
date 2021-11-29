import { Component } from '@angular/core';

import { routeAnimation } from '../../../../core/animations/route.animation';

@Component({
  selector: 'service-desk-ui-categories-page',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  animations: [routeAnimation],
})
export class CategoriesPageComponent {}
