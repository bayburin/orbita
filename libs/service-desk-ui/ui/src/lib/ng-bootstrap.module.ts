import { NgModule } from '@angular/core';

import { NgbNavModule, NgbToastModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

const modules: any[] = [NgbTypeaheadModule, NgbNavModule, NgbToastModule, NgbTooltipModule];

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class NgBootstrapModule {}
