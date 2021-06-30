/**
 * Фильтр, использующийся для определения хоста
 */
export interface HostFilter {
  idfield: HostFilterTypes;
  id: string;
}

export type HostFilterTypes = 'id' | 'ip' | 'mac' | 'name';
