import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatetimePipe } from './pipes/datetime/datetime.pipe';

const pipes: any[] = [DatetimePipe];

@NgModule({
  imports: [CommonModule],
  exports: [...pipes],
  declarations: [...pipes],
})
export class SharedUiModule {}
