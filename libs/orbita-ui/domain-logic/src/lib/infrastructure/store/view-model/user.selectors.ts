import { createSelector } from '@ngrx/store';

import * as GroupSelectors from '../group/group.selectors';
import * as UserSelectors from '../user/user.selectors';

export const getGroupedUsers = createSelector(GroupSelectors.getAll, UserSelectors.getAll, (groups, users) => {
  return groups.reduce((acc, group) => {
    const userGroup = {
      ...group,
      users: users.filter((user) => user.group_id == group.id),
    };

    return acc.concat(userGroup);
  }, []);
});
