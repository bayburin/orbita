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
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ListboxModule } from 'primeng/listbox';
import { ChipModule } from 'primeng/chip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';

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
  BreadcrumbModule,
  ListboxModule,
  ChipModule,
  AutoCompleteModule,
  SelectButtonModule,
  CheckboxModule,
  DynamicDialogModule,
  MessagesModule,
  MessageModule,
  DialogModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers: [ConfirmationService, DialogService],
})
export class PrimengModule {}
