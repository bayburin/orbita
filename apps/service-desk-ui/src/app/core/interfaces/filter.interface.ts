import { Category } from '../../modules/ticket/models/category/category.model';
import { Service } from '../../modules/ticket/models/service/service.model';
import { Ticket } from '../../modules/ticket/models/ticket/ticket.model';

export interface FilterI {
  //
  // id: number;
  //
  id: any; // Category | Service | Ticket;
  name: string;
  count: number;
}
