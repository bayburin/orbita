import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SdRequestViewModel, HistoryViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-sd-request-details',
  templateUrl: './sd-request-details.component.html',
  styleUrls: ['./sd-request-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdRequestDetailsComponent {
  @Input() sdRequest: SdRequestViewModel;

  get lastHistory(): HistoryViewModel {
    return this.sdRequest.histories[this.sdRequest.histories.length - 1];
  }

  // get lastWorkflow(): MessageViewModel {
  //   return this.sdRequest.workflows[this.sdRequest.workflows.length - 1];
  // }
}
