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
import { TabViewModule } from 'primeng/tabview';
import { ScrollTopModule } from 'primeng/scrolltop';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { SkeletonModule } from 'primeng/skeleton';
import { AccordionModule } from 'primeng/accordion';

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
  TabViewModule,
  ScrollTopModule,
  PanelModule,
  CalendarModule,
  MultiSelectModule,
  DropdownModule,
  ToastModule,
  ToolbarModule,
  SkeletonModule,
  AccordionModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers: [ConfirmationService],
})
export class PrimengModule {}
