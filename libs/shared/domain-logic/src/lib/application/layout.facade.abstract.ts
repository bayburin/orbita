import { Observable, of } from 'rxjs';

/**
 * Фасад для обращений к Layout приложения
 */
export abstract class LayoutFacadeAbstract {
  /**
   * Индикатор, открыт ли компонент
   */
  sidebarOpened$: Observable<boolean>;
  /**
   * Пользовательская тема
   */
  theme$: Observable<string>;

  /**
   * Открывает Sidebar
   */
  abstract openSidebar(): void;

  /**
   * Закрывает Sidebar
   */
  abstract closeSidebar(): void;

  /**
   * Активирует текущую тему
   */
  abstract initTheme(): void;

  /**
   * Устанавливает тему
   *
   * @param cssFile - имя подключаемого файла
   */
  abstract setTheme(cssFile: string): void;
}
