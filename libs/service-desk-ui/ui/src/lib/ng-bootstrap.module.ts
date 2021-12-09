import { NgModule } from '@angular/core';

import { NgbNavModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

const modules: any[] = [NgbTypeaheadModule, NgbNavModule];

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class NgBootstrapModule {}
