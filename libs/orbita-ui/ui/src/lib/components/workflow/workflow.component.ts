import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MessageViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowComponent {
  @Input() workflow: MessageViewModel;
}
