import { Service } from '../models/service.interface';
import { SvtItem } from '../models/svt/svt-item.interface';

export interface UserOwns {
  services: Service[];
  items: SvtItem[];
}
