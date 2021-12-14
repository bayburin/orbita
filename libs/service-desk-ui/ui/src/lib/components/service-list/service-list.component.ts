import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ServiceVM, CategoryVM } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent {
  /**
   * Категория, содержащая список услуг
   */
  @Input() category: CategoryVM;
  /**
   * Стили, которые необходимо применить к списку
   */
  @Input() styleClass: string;

  trackByService(index: number, service: ServiceVM) {
    return service.id;
  }
}
