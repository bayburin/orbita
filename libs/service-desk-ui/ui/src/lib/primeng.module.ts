import { NgModule } from '@angular/core';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ConfirmationService, MessageService } from 'primeng/api';

const modules: any[] = [TableModule, DialogModule, ButtonModule, InputTextModule, CheckboxModule, ConfirmDialogModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers: [ConfirmationService, MessageService],
})
export class PrimengModule {}
