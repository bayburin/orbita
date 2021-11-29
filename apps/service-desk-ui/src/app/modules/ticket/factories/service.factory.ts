import { Service } from '../models/service/service.model';

export class ServiceFactory {
  static create(params: any) {
    return new Service(params);
  }
}
