import { MessageEntity } from './message.models';
import { State, messageAdapter, initialState } from './message.reducer';
import * as MessageSelectors from './message.selectors';

describe('Message Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMessageId = (it) => it['id'];
  const createMessageEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as MessageEntity);

  let state;

  beforeEach(() => {
    state = {
      message: messageAdapter.setAll(
        [
          createMessageEntity('PRODUCT-AAA'),
          createMessageEntity('PRODUCT-BBB'),
          createMessageEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Message Selectors', () => {
    it('getAllMessage() should return the list of Message', () => {
      const results = MessageSelectors.getAllMessage(state);
      const selId = getMessageId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = MessageSelectors.getSelected(state);
      const selId = getMessageId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getMessageLoaded() should return the current 'loaded' status", () => {
      const result = MessageSelectors.getMessageLoaded(state);

      expect(result).toBe(true);
    });

    it("getMessageError() should return the current 'error' state", () => {
      const result = MessageSelectors.getMessageError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
