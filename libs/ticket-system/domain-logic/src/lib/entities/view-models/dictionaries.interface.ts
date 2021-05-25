import { MessageViewModel } from './message-view-model.interface';
import { WorkViewModel } from './work-view-model.interface';
import { HistoryViewModel } from './history-view-model.interface';

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
 * Интерфейс словаря представления работы
 */
export interface HistoryViewModelDict {
  [key: number]: HistoryViewModel;
}
