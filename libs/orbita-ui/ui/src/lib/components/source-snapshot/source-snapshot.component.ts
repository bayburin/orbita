import { Component, Input } from '@angular/core';
import { SourceSnapshot } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-source-snapshot',
  templateUrl: './source-snapshot.component.html',
  styleUrls: ['./source-snapshot.component.scss'],
})
export class SourceSnapshotComponent {
  @Input() snapshot: SourceSnapshot;
}
