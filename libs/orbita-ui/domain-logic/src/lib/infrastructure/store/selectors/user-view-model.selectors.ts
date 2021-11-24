import { createSelector } from '@ngrx/store';

import * as GroupSelectors from '../group/group.selectors';
import * as UserSelectors from '../user/user.selectors';
import { UserGroup } from './../../../entities/view-models/user-group.interface';

export const getGroupedUsers = createSelector(GroupSelectors.getAll, UserSelectors.getAll, (groups, users) =>
  groups.reduce<UserGroup[]>((acc, group) => {
    const userGroup = {
      ...group,
      users: users.filter((user) => user.group_id == group.id),
    };

    acc.push(userGroup);

    return acc;
  }, [])
);
