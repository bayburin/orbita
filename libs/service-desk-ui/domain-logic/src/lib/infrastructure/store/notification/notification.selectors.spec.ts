import { LimitTypes, Notification } from '../../../entities/model/notification.interface';
import { notificationAdapter, initialState } from './notification.reducer';
import * as NotificationSelectors from './notification.selectors';

describe('NotificationSelectors', () => {
  const error = { message: 'error message' };
  const createNotificationEntity = (id: number, message = ''): Notification =>
    ({
      id,
      body: { message: message || `message-${id}` },
    } as Notification);
  const arrEntities = [createNotificationEntity(3), createNotificationEntity(2), createNotificationEntity(1)];
  const entities = {
    3: arrEntities[0],
    2: arrEntities[1],
    1: arrEntities[2],
  };
  const tmpNotifications = [{ message: 'fake-1' }, { message: 'fake-2' }];
  let state: any;

  beforeEach(() => {
    state = notificationAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
      loading: true,
      loadingNew: true,
      limitType: LimitTypes.FULL,
      unreadNotificationCount: 17,
      tmpNotifications,
      error,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(NotificationSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(NotificationSelectors.getLoading.projector(state)).toEqual(true);
  });

  it('getLoadingNew() should return "loadingNew" attribute', () => {
    expect(NotificationSelectors.getLoadingNew.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(NotificationSelectors.getError.projector(state)).toEqual(error);
  });

  it('getAll() should return array of entities', () => {
    expect(NotificationSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(NotificationSelectors.getEntities.projector(state)).toEqual(entities);
  });

  it('getLimitType() should return "limitType" attribute', () => {
    expect(NotificationSelectors.getLimitType.projector(state)).toBe(LimitTypes.FULL);
  });

  it('getUnreadNotificationCount() should return "unreadNotificationCount" attribute', () => {
    expect(NotificationSelectors.getUnreadNotificationCount.projector(state)).toBe(17);
  });

  it('getTmpNotifications() should return "tmpNotifications" attribute', () => {
    expect(NotificationSelectors.getTmpNotifications.projector(state)).toEqual(tmpNotifications);
  });
});
