import { createSelector } from '@ngrx/store';

import * as MessageSelectors from '../message/message.selectors';
import * as UserSelectors from '../user/user.selectors';
import { MessageViewModel } from './../../../entities/view-models/message-view-model.interface';
import { MessageViewModelDict } from './../../../entities/view-models/dictionaries.interface';

export const getAllViewModel = createSelector(
  MessageSelectors.getAll,
  UserSelectors.getEntities,
  (messages, userEntities): MessageViewModel[] =>
    messages.map(message => ({
      ...message,
      sender: userEntities[message.sender_id]
    })
  )
)

export const getEntitiesViewModel = createSelector(
  MessageSelectors.getEntities,
  UserSelectors.getEntities,
  (messageEntities, userEntities): MessageViewModelDict => {
    return Object.keys(messageEntities).reduce<MessageViewModelDict>((acc, key) => {
      const entity = messageEntities[key];

      acc[key] = {
        ...entity,
        sender: userEntities[entity.sender_id]
      }

      return acc;
    }, {})
  }
)
