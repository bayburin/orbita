import { normalize } from 'normalizr';

import { SvtItem } from './../../entities/models/svt/svt-item.interface';
import { NormalizedSvtItems, NormalizedSvtItem } from './../../entities/models/normalized-data.interface';
import { svtItemsSchema, svtItemSchema } from './../schemas/normalizr.schema';

/**
 * Сервис для нормализации данных полученных из системы СВТ
 */
export class SvtItemCacheService {
  static normalizeSvtItems(svtItems: SvtItem[]): NormalizedSvtItems {
    return normalize(svtItems, svtItemsSchema);
  }

  static normalizeSvtItem(svtItem: SvtItem): NormalizedSvtItem {
    return normalize(svtItem, svtItemSchema);
  }
}
