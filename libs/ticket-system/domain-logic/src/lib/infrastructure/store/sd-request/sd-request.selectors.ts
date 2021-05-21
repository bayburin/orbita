import { createSelector } from '@ngrx/store';

import { getTicketSystemState } from './../index';
import { SD_REQUEST_FEATURE_KEY, State, SdRequestPartialState, sdRequestAdapter } from './sd-request.reducer';
import { getLastHistory } from '../../utils/get-last-history.function';

export const getSdRequestState = createSelector(
  getTicketSystemState,
  (state: SdRequestPartialState) => state[SD_REQUEST_FEATURE_KEY]
);

const { selectAll, selectEntities } = sdRequestAdapter.getSelectors();

export const getPage = createSelector(
  getSdRequestState,
  (state: State) => state.page
);

export const getTotalCount = createSelector(
  getSdRequestState,
  (state: State) => state.totalCount
);

export const getMaxSize = createSelector(
  getSdRequestState,
  (state: State) => state.maxSize
);

export const getSelectedId = createSelector(
  getSdRequestState,
  (state: State) => state.selectedId
);

export const getLoading = createSelector(
  getSdRequestState,
  (state: State) => state.loading
);

export const getLoaded = createSelector(
  getSdRequestState,
  (state: State) => state.loaded
);

export const getError = createSelector(
  getSdRequestState,
  (state: State) => state.error
);

// TODO: Исправить
export const getAll = createSelector(
  getSdRequestState,
  (state: State) => selectAll(state)
    // selectAll(state).map(sdRequest => {
    //   if (!sdRequest.works) {
    //     return sdRequest;
    //   }

    //   const lastHistory = getLastHistory(sdRequest);
    //   const works = sdRequest.works.map(work => {
    //     const histories = work.histories.map(hist => {
    //       return {
    //         ...hist,
    //         _isLast: hist == lastHistory
    //       }
    //     });

    //     return {
    //       ...work,
    //       histories
    //     }
    //   });

    //   return {
    //     ...sdRequest,
    //     works
    //   }
    // })
);

export const getEntities = createSelector(
  getSdRequestState,
  (state: State) => selectEntities(state)
);

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getLastHistories = createSelector(
  getEntities,
  (entities) => Object.keys(entities).map(id => ({ [id]: getLastHistory(entities[id]) }))
)
