import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';

import { DatetimePipe } from './pipes/datetime/datetime.pipe';

import { PageErrorComponent } from './components/page-error/page-error.component';

const modules: any[] = [MomentModule];

const pipes: any[] = [DatetimePipe];

const components: any[] = [PageErrorComponent];

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...pipes, ...components, ...modules],
  declarations: [...pipes, ...components],
})
export class SharedUiModule {}
