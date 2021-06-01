import { MessageViewModel } from './message-view-model.interface';
import { WorkViewModel } from './work-view-model.interface';
import { HistoryViewModel } from './history-view-model.interface';
import { WorkerViewModel } from './worker-view-model.interface';

/**
 * Интерфейс словаря представления сообщения
 */
export interface MessageViewModelDict {
  [key: number]: MessageViewModel;
}

/**
 * Интерфейс словаря представления работы
 */
export interface WorkViewModelDict {
  [key: number]: WorkViewModel;
}

/**
 * Интерфейс словаря представления истории событий
 */
export interface HistoryViewModelDict {
  [key: number]: HistoryViewModel;
}

/**
 * Интерфейс словаря представления исполнителя
 */
export interface WorkerViewModelDict {
  [key: number]: WorkerViewModel;
}
