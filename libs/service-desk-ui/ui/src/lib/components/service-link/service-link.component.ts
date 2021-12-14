import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lib-service-link',
  templateUrl: './service-link.component.html',
  styleUrls: ['./service-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceLinkComponent {
  /**
   * Id категории
   */
  @Input() categoryId: number;
  /**
   * Id услуги
   */
  @Input() serviceId: number;
}
