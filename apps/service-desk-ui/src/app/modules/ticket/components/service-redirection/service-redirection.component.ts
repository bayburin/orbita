import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, filter, first, map, delay, tap, switchMap, catchError } from 'rxjs/operators';

import { ServiceService } from '../../../../shared/services/service/service.service';

@Component({
  selector: 'service-desk-ui-service-redirection',
  templateUrl: './service-redirection.component.html',
  styleUrls: ['./service-redirection.component.sass'],
})
export class ServiceRedirectionComponent implements OnInit {
  loading = false;

  constructor(private route: ActivatedRoute, private router: Router, private serviceService: ServiceService) {}

  ngOnInit() {
    this.loadService();
  }

  /**
   * Загружает данные об услуге, включая заявки, вопросы и ответы.
   */
  loadService(): void {
    const serviceId = this.route.snapshot.params.id;

    this.loading = true;
    this.serviceService
      .loadService(serviceId)
      .pipe(
        finalize(() => (this.loading = false)),
        tap((service) => {
          this.router.navigate(['/categories', service.categoryId, 'services', service.id]);
        }),
        catchError(() => this.router.navigate(['/']))
      )
      .subscribe();
  }
}
