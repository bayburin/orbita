import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { withLatestFrom, map, filter, take } from 'rxjs/operators';
import { ServiceFacade } from '@orbita/service-desk-ui/domain-logic';

@Injectable({
  providedIn: 'root',
})
export class ServiceRedirectionResolver implements Resolve<boolean> {
  constructor(private serviceFacade: ServiceFacade, private router: Router) {}

  resolve(): Observable<boolean> {
    this.serviceFacade.loadSelected();

    return this.serviceFacade.loaded$.pipe(
      filter((loaded) => loaded),
      withLatestFrom(this.serviceFacade.entity$),
      take(1),
      map(([_loaded, service]) => {
        this.router.navigate(['/categories', service.category_id, 'services', service.id]);

        return true;
      })
    );
  }
}
