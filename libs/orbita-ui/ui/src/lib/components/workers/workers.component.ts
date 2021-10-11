import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WorkViewModel, WorkerViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkersComponent {
  /**
   * Список работ тикета
   */
  @Input() works: WorkViewModel[];

  trackByWork(index: number, work: WorkViewModel): number {
    return work.id;
  }

  trackByWorker(index: number, worker: WorkerViewModel): number {
    return worker.id;
  }
}
