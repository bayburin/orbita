/**
 * Фильтр
 */
export interface SimpleFilter {
  [key: string]: any;
}

/**
 * Фильтр, использующийся для определения хоста
 */
export interface HostFilter {
  idfield: HostFilterTypes;
  id: string;
}

export type HostFilterTypes = 'id' | 'ip' | 'mac' | 'name';

/**
 * Фильтры использующиеся для определения ВТ
 */
export type SvtFilters = {
  [key in SvtFilterTypes]?: string | number;
};

export type SvtFilterTypes = 'id_tn' | 'fio' | 'dept' | 'invent_num' | 'barcode';
