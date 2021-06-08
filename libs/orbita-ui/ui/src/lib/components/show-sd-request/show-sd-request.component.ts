import { Component, Input } from '@angular/core';
import { SdRequestViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-show-sd-request',
  templateUrl: './show-sd-request.component.html',
  styleUrls: ['./show-sd-request.component.scss'],
})
export class ShowSdRequestComponent {
  /**
   * Заявка
   */
  @Input() sdRequest: SdRequestViewModel;

  sendMessage(message: string): void {
    // TODO: Отправить событие родительскому контроллеру
    console.log(message);
  }
}
