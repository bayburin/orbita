import { MessageViewModel } from './message-view-model.interface';
import { WorkViewModel } from './work-view-model.interface';

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
