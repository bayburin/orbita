import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [CommonModule, ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  declarations: [SearchComponent],
  exports: [SearchComponent],
})
export class ServiceDeskUiFeatureSearchModule {}
