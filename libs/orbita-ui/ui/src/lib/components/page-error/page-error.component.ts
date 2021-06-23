import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss'],
})
export class PageErrorComponent {
  @Input() error: string;
}
