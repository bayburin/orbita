import { NgModule } from '@angular/core';

import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

const modules: any[] = [NgbTypeaheadModule];

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class NgBootstrapModule {}
