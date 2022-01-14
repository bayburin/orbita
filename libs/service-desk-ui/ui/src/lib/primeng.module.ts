import { NgModule } from '@angular/core';

import { TableModule } from 'primeng/table';

const modules: any[] = [TableModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class PrimengModule {}
