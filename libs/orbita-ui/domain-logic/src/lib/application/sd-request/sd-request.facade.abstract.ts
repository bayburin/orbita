import { Observable, Subscription } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';

import { SdRequestViewModel } from './../../entities/view-models/sd-request-view-model.interface';
import { SdRequestViewForm } from './../../entities/forms/sd-request-view-form.interface';
import { NewSdRequestViewForm } from './../../entities/forms/new-sd-request-view-form.interface';

export abstract class SdRequestFacadeAbstract {
  /**
   * Общее число записей
   */
  totalCount$: Observable<number>;
  /**
   * Индикатор, идет ли загрузка в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;
  /**
   * Список заявок
   */
  all$: Observable<SdRequestViewModel[]>;
  /**
   * Содержит ошибку, возникшую в процессе загрузки или обработки заявки
   */
  error$: Observable<any>;
  /**
   * Выбранная заявка
   */
  selectedEntity$: Observable<SdRequestViewModel>;
  /**
   * Скелетон, показывающий начальную загрузку страницы просмотра заявки
   */
  selectedSkeleton$: Observable<boolean>;
  /**
   * Флаг, отображающий режим редактирования
   */
  selectedEditMode$: Observable<boolean>;
  /**
   * Содержит ошибку, возникшую в процессе загрузки или обработки заявки
   */
  selectedError$: Observable<string>;
  /**
   * Форма существующей заявки
   */
  formEntity$: Observable<SdRequestViewForm>;
  /**
   * Индикатор загрузки существующей формы
   */
  formLoading$: Observable<boolean>;
  /**
   * Форма новой заявки
   */
  newFormEntity$: Observable<NewSdRequestViewForm>;
  /**
   * Индикатор загрузки новой формы
   */
  newFormLoading$: Observable<boolean>;
  /**
   * Созданаая заявка
   */
  newFormCreated$: Observable<SdRequestViewModel>;
  /**
   * Флаг, определяющий, показывать ли модальное окно с созданной заявкой
   */
  newFormShowModalAfterCreate$: Observable<boolean>;
  /**
   * Загружает список заявок по указанным фильтрам для таблицы заявок
   *
   * @param data - метаданные для загрузки данных таблицы
   */
  abstract loadSdRequestsTable(data: LazyLoadEvent): void;

  /**
   * Загружает список заявок по указанным фильтрам
   *
   * @param data - метаданные для загрузки данных таблицы
   */
  abstract loadFiltered(data: LazyLoadEvent): void;

  /**
   * Загружает выбранную заявку
   */
  abstract loadSelectedSdRequest(): void;

  /**
   * Очищает данные о выбранной заявке и связанные с ней объекты
   */
  abstract clearSelected(): void;

  /**
   * Активирует или отключает режим редактирования при просмотре заявки
   */
  abstract toggleEditMode(): void;

  /**
   * Сохраняет данные существующей формы в хранилище
   *
   * @param form - данные формы
   */
  abstract changeForm(form: SdRequestViewForm): void;

  /**
   * Обновляет данные по выбранной заявке
   */
  abstract updateForm(): void;

  /**
   * Очищает все данные по заявкам и их составляющих
   */
  abstract clearAll(): void;

  /**
   * Инициализирует форму: загружает дополнительные данные, если это необходимо
   */
  abstract initNewForm(): void;

  /**
   * Сохраняет данные новой формы в хранилище
   *
   * @param form - данные формы
   */
  abstract changeNewForm(form: NewSdRequestViewForm): void;

  /**
   * Сохраняет данные формы новой заявки
   */
  abstract createForm(): void;

  /**
   * Закрывает модальное окно с созданной заявкой
   */
  abstract closeModalAfterCreateSdRequest(): void;

  /**
   * Очищает хранилище, содержащее данные по созданной заявке (форму, саму заявку, различные флаги...)
   */
  abstract clearCreatedForm(): void;

  /**
   * Подключается к каналу 'SdRequests::CreateChannel'
   */
  abstract connectToSdRequestsCreateChannel(): Subscription;

  /**
   * Подключается к каналу 'SdRequests::UpdateChannel'
   */
  abstract connectToSdRequestsUpdateChannel(): Subscription;

  /**
   * Актуализирует данные в текущей форме заявки
   */
  abstract reinitUpdateForm(): void;

  /**
   * Закрывает заявку
   *
   * @param id - номер заявки
   */
  abstract closeSdRequest(id: number): void;
}
