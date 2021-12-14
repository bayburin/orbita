import { Component, Input } from '@angular/core';

import { Hideable } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-visible-icon',
  templateUrl: './visible-icon.component.html',
  styleUrls: ['./visible-icon.component.scss'],
})
export class VisibleIconComponent {
  @Input() hideable: Hideable;
}
