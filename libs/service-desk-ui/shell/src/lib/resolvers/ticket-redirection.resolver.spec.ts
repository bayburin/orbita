import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TicketOverviewVM, TicketFacade, TicketFacadeStub } from '@orbita/service-desk-ui/domain-logic';

import { TicketRedirectionResolver } from './ticket-redirection.resolver';
import { BehaviorSubject } from 'rxjs';

@Component({})
class ExampleComponent {}

describe('TicketRedirectionResolver', () => {
  let resolver: TicketRedirectionResolver;
  let facade: TicketFacade;
  let router: Router;
  let ticket: TicketOverviewVM;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'categories/:category_id/tickets/:id', component: ExampleComponent }]),
      ],
      providers: [{ provide: TicketFacade, useClass: TicketFacadeStub }, TicketRedirectionResolver],
    });

    resolver = TestBed.inject(TicketRedirectionResolver);
    facade = TestBed.inject(TicketFacade);
    router = TestBed.inject(Router);
    ticket = {
      id: 1,
      identity: 2,
      service: { category_id: 3 },
    } as TicketOverviewVM;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should redirect to ticket page if data is loaded', () => {
    const spy = jest.spyOn(router, 'navigate');

    (facade.ticket$ as unknown as BehaviorSubject<TicketOverviewVM>).next(ticket);
    (facade.loaded$ as unknown as BehaviorSubject<boolean>).next(true);
    resolver.resolve().subscribe();

    expect(spy).toHaveBeenCalledWith(['/categories', ticket.service.category_id, 'services', ticket.service.id], {
      queryParams: { identity: ticket.identity },
    });
  });
});
