import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SourceSnapshot } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-source-snapshot',
  templateUrl: './source-snapshot.component.html',
  styleUrls: ['./source-snapshot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceSnapshotComponent {
  @Input() snapshot: SourceSnapshot;
}
