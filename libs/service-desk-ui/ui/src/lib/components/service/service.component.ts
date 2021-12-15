import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ServicePermission, ServiceVM } from '@orbita/service-desk-ui/domain-logic';
import { AbstractSearchResultComponent } from './../abstract-search-result/abstract-search-result.component';

@Component({
  selector: 'lib-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceComponent extends AbstractSearchResultComponent<ServiceVM> {
  permission = ServicePermission;
}
