import { MessageViewModel } from './message-view-model.interface';
import { WorkViewModel } from './work-view-model.interface';
import { HistoryViewModel } from './history-view-model.interface';
import { WorkerViewModel } from './worker-view-model.interface';

/**
 * Словарь представления сообщения
 */
export interface MessageViewModelDict {
  [key: number]: MessageViewModel;
}

/**
 * Словарь представления работы
 */
export interface WorkViewModelDict {
  [key: number]: WorkViewModel;
}

/**
 * Словарь представления истории событий
 */
export interface HistoryViewModelDict {
  [key: number]: HistoryViewModel;
}

/**
 * Словарь представления исполнителя
 */
export interface WorkerViewModelDict {
  [key: number]: WorkerViewModel;
}
