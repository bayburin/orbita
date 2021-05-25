import { HistoryFacadeAbstract } from './history.facade.abstract';
import { History } from '../../entities/models/history.interface';

export class HistoryFacadeStub implements HistoryFacadeAbstract {
  setHistories(histories: History[]) { /** */ }
}
