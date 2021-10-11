import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Group } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupHeaderComponent {
  @Input() group: Group;
}
