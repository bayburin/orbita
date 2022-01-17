import { NgModule } from '@angular/core';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';

const modules: any[] = [TableModule, DialogModule, ButtonModule, InputTextModule, CheckboxModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class PrimengModule {}
