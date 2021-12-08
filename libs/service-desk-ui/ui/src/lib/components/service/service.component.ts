import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Service } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceComponent {
  /**
   * Услуга
   */
  @Input() data: Service;
}
