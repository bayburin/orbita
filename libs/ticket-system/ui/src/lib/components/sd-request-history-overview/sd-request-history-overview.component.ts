import { Component, Input } from '@angular/core';
import { SdRequestViewModel, WorkViewModel, HistoryViewModel } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'lib-sd-request-history-overview',
  templateUrl: './sd-request-history-overview.component.html',
  styleUrls: ['./sd-request-history-overview.component.scss']
})
export class SdRequestHistoryOverviewComponent {
  /**
   * Заявка
   */
  @Input() sdRequest: SdRequestViewModel;
  /**
   * Событие (история), которое произошло самым последним в текущей заявке
   */
  lastHistory: History;

  trackByWork(_index: number, work: WorkViewModel): number {
    return work.id;
  }

  trackByHistory(_index: number, history: HistoryViewModel): number {
    return history.id;
  }

  sendMessage(message: string): void {
    // TODO: Отправить событие родительскому контроллеру
  }
}
