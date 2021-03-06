import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { WorkViewModel, HistoryViewModel, WorkerViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-sd-request-history-overview',
  templateUrl: './sd-request-history-overview.component.html',
  styleUrls: ['./sd-request-history-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdRequestHistoryOverviewComponent implements AfterViewChecked {
  /**
   * Работы по заявке
   */
  @Input() works: WorkViewModel[];
  /**
   * Событие, которое произошло самым последним в текущей заявке
   */
  @Input() lastHistory: HistoryViewModel;
  /**
   * Список элементов, ширину которых необходимо учитывать
   */
  @ViewChildren('worksEl') worksEl: QueryList<ElementRef>;

  constructor(private changeDetection: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    // Необходимо вызывать для корректной работы директивы libCalcScrollWidthByWorks
    this.changeDetection.detectChanges();
  }

  /**
   * Возвращает последнее событие для указанной работы
   *
   * @param work - работа
   */
  lastHistoryForWork(work: WorkViewModel) {
    return work.histories[work.histories.length - 1];
  }

  trackByWork(_index: number, work: WorkViewModel): number {
    return work.id;
  }

  trackByHistory(_index: number, history: HistoryViewModel): number {
    return history.id;
  }

  trackByWorker(_index: number, worker: WorkerViewModel): number {
    return worker.id;
  }
}
