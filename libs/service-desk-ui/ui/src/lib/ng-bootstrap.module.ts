import { NgModule } from '@angular/core';

import { NgbNavModule, NgbToastModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

const modules: any[] = [NgbTypeaheadModule, NgbNavModule, NgbToastModule];

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class NgBootstrapModule {}
