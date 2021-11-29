import { Component, OnInit } from '@angular/core';

import { routeAnimation } from '../../../../../core/animations/route.animation';

@Component({
  selector: 'service-desk-ui-tickets-page',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.sass'],
  animations: [routeAnimation],
})
export class TicketsPageComponent {}
