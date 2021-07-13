import { Component, Input } from '@angular/core';
import { MessageViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss'],
})
export class WorkflowsComponent {
  @Input() workflows: MessageViewModel[];

  trackByWorkflow(index: number, workflow: MessageViewModel): number {
    return workflow.id;
  }
}
