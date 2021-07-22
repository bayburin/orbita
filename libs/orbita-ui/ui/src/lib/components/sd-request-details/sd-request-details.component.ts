import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SdRequestViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-sd-request-details',
  templateUrl: './sd-request-details.component.html',
  styleUrls: ['./sd-request-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdRequestDetailsComponent {
  @Input() sdRequest: SdRequestViewModel;
}
