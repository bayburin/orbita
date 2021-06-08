import { NgModule } from '@angular/core';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ScrollTopModule } from 'primeng/scrolltop';

import { ConfirmationService } from 'primeng/api';

const modules: any[] = [
  TableModule,
  ButtonModule,
  CardModule,
  TagModule,
  DividerModule,
  TooltipModule,
  InputTextareaModule,
  ScrollPanelModule,
  MenuModule,
  BadgeModule,
  InputTextModule,
  ConfirmDialogModule,
  ScrollTopModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers: [ConfirmationService],
})
export class PrimengModule {}
