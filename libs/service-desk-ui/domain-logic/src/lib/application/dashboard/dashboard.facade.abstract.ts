import { Observable } from 'rxjs';

export abstract class DashboardFacadeAbstract {
  /**
   * Индикатор, идет ли загрузка данных для дашбоарда в данный момент
   */
  loadingDashboard$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные для дашбоарда
   */
  loadedDashboard$: Observable<boolean>;

  /**
   * Загружает данные для дашбоарда
   */
  abstract loadDashboard(): void;
}
