/**
 * Тип ВТ
 */
export interface SvtType {
  /**
   * Идентификатор типа
   */
  readonly type_id: number;

  /**
   * Имя типа
   */
  readonly name: string;

  /**
   * Краткое описание
   */
  readonly short_description: string;

  /**
   * Полное описание
   */
  readonly long_description: string;
}

// ! TODO: Удалить и подгрузить динамически
export const svtTypes: SvtType[] = [
  { type_id: 2, name: 'pc', short_description: 'Системный блок', long_description: 'Системный блок (включая неттопы)' },
  { type_id: 4, name: 'monitor', short_description: 'Монитор', long_description: 'Монитор (телевизор)' },
  { type_id: 5, name: 'printer', short_description: 'Принтер', long_description: 'Принтер (без функции сканера)' },
  { type_id: 7, name: 'plotter', short_description: 'Плоттер', long_description: 'Плоттер' },
  {
    type_id: 8,
    name: 'mfu',
    short_description: 'МФУ',
    long_description: 'МФУ (совмещает функции принтера, сканера, ксерокса)',
  },
  {
    type_id: 9,
    name: 'copier',
    short_description: 'Копир. аппарат',
    long_description: 'Копировальный аппарат (без сканирования в файл)',
  },
  {
    type_id: 10,
    name: 'print_server',
    short_description: 'Принт-сервер',
    long_description: 'Принт-сервер (устройство для подключения несетевого принтера к сети)',
  },
  { type_id: 11, name: 'ups', short_description: 'ИБП', long_description: 'Источник бесперебойного питания' },
  { type_id: 12, name: '3d_printer', short_description: '3D-принтер', long_description: '3D-принтер' },
  {
    type_id: 16,
    name: 'allin1',
    short_description: 'Моноблок',
    long_description: 'Моноблок (ПК с монитором в одном корпусе)',
  },
  { type_id: 17, name: 'notebook', short_description: 'Ноутбук', long_description: 'Ноутбук' },
  { type_id: 18, name: 'tablet', short_description: 'Планшет', long_description: 'Планшетный компьютер' },
  { type_id: 19, name: 'projector', short_description: 'Проектор', long_description: 'Проектор' },
  {
    type_id: 20,
    name: 'print_system',
    short_description: 'Печатная машина',
    long_description: 'Инженерная система печати',
  },
  { type_id: 21, name: 'laminator', short_description: 'Ламинатор', long_description: 'Ламинатор' },
  { type_id: 22, name: 'shredder', short_description: 'Шредер', long_description: 'Шредер' },
  { type_id: 23, name: 'tv', short_description: 'Телевизор', long_description: 'Телевизор' },
  { type_id: 24, name: 'camera', short_description: 'Фото- и видеотехника', long_description: 'Фото- и видеотехника' },
  { type_id: 25, name: 'other', short_description: 'Другое', long_description: 'Другое' },
];
