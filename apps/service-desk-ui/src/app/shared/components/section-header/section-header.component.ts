import { Component, Input } from '@angular/core';

@Component({
  selector: 'service-desk-ui-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
})
export class SectionHeaderComponent {
  @Input() header: string;
  @Input() addClass: string;
}
