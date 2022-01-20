import { NgModule } from '@angular/core';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ConfirmationService, MessageService } from 'primeng/api';

const modules: any[] = [
  TableModule,
  DialogModule,
  ButtonModule,
  InputTextModule,
  CheckboxModule,
  ConfirmDialogModule,
  ToolbarModule,
  DynamicDialogModule,
  DividerModule,
  InputTextareaModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers: [ConfirmationService, MessageService, DialogService],
})
export class PrimengModule {}
