import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ServiceVM } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent {
  /**
   * Список услуг
   */
  @Input() services: ServiceVM[];
  /**
   * Стили, которые необходимо применить к списку
   */
  @Input() styleClass: string;

  trackByService(index: number, service: ServiceVM) {
    return service.id;
  }
}
