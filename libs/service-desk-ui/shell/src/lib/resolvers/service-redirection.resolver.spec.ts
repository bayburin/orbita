import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Service, ServiceFacade, ServiceFacadeStub } from '@orbita/service-desk-ui/domain-logic';

import { ServiceRedirectionResolver } from './service-redirection.resolver';
import { BehaviorSubject } from 'rxjs';

@Component({})
class ExampleComponent {}

describe('ServiceRedirectionResolver', () => {
  let resolver: ServiceRedirectionResolver;
  let facade: ServiceFacade;
  let router: Router;
  let service: Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'categories/:category_id/services/:id', component: ExampleComponent }]),
      ],
      providers: [{ provide: ServiceFacade, useClass: ServiceFacadeStub }, ServiceRedirectionResolver],
    });

    resolver = TestBed.inject(ServiceRedirectionResolver);
    facade = TestBed.inject(ServiceFacade);
    router = TestBed.inject(Router);
    service = { id: 1, category_id: 2 } as Service;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should redirect to service page if data is loaded', () => {
    const spy = jest.spyOn(router, 'navigate');

    (facade.entity$ as unknown as BehaviorSubject<Service>).next(service);
    (facade.loaded$ as unknown as BehaviorSubject<boolean>).next(true);
    resolver.resolve().subscribe();

    expect(spy).toHaveBeenCalledWith(['/categories', service.category_id, 'services', service.id]);
  });
});
