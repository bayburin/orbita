import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { withLatestFrom, map, filter, take } from 'rxjs/operators';
import { TicketFacade } from '@orbita/service-desk-ui/domain-logic';

@Injectable({
  providedIn: 'root',
})
export class TicketRedirectionResolver implements Resolve<boolean> {
  constructor(private ticketFacade: TicketFacade, private router: Router) {}

  resolve(): Observable<boolean> {
    this.ticketFacade.loadSelected();

    return this.ticketFacade.loaded$.pipe(
      filter((loaded) => !!loaded),
      take(1),
      withLatestFrom(this.ticketFacade.ticket$),
      map(([_loaded, ticket]) => {
        this.router.navigate(['/categories', ticket.service.category_id, 'services', ticket.service.id], {
          queryParams: { identity: ticket.identity },
        });

        return true;
      })
    );
  }
}
