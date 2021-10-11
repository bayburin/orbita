import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-panel-placeholder',
  templateUrl: './panel-placeholder.component.html',
  styleUrls: ['./panel-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelPlaceholderComponent {}
