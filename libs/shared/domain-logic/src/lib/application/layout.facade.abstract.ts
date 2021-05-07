import { Observable, of } from 'rxjs';

/**
 * Фасад для обращений к Layout приложения
 */
export abstract class LayoutFacadeAbstract {
  /**
   * Индикатор, открыт ли компонент
   */
  sidebarOpened$: Observable<boolean> = of();

  /**
   * Открывает Sidebar
   */
  abstract openSidebar(): void;

  /**
   * Закрывает Sidebar
   */
  abstract closeSidebar(): void
}
