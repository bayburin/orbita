import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ParameterViewModel, CommonParameter, TableParameter } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-sd-request-parameters',
  templateUrl: './sd-request-parameters.component.html',
  styleUrls: ['./sd-request-parameters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdRequestParametersComponent {
  @Input() parameters: ParameterViewModel;

  get common(): CommonParameter[] {
    return this.parameters.payload.common;
  }

  get table(): TableParameter {
    return this.parameters.payload.table;
  }
}
