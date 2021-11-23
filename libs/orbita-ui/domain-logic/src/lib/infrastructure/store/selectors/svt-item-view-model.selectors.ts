import { createSelector } from '@ngrx/store';

import * as SvtItemSelectors from './../svt-item/svt-item.selectors';
import * as SvtTypeSelectors from './../svt-type/svt-type.selectors';
import * as SvtWorkplaceSelectors from './../svt-workplace/svt-workplace.selectors';
import * as SvtWorkplaceTypeSelectors from './../svt-workplace-type/svt-workplace-type.selectors';
import * as SvtWorkplaceCountSelectors from './../svt-workplace-count/svt-workplace-count.selectors';
import { SvtItemViewModel } from './../../../entities/view-models/svt/svt-item-view-model.interface';
import { SvtWorkplace } from './../../../entities/models/svt/svt-workplace.interface';
import { SvtWorkplaceViewModel } from './../../../entities/view-models/svt/svt-workplace-view-model.interface';

export const getAllSvtItems = createSelector(
  SvtItemSelectors.getAll,
  SvtTypeSelectors.getEntities,
  SvtWorkplaceSelectors.getEntities,
  SvtWorkplaceTypeSelectors.getEntities,
  SvtWorkplaceCountSelectors.getEntities,
  (items, typeEntities, wpEntities, wpTypeEntities, wpCountEntities): SvtItemViewModel[] =>
    items.map((item) => {
      const workplace: SvtWorkplace = wpEntities[item.workplace_id];
      const workplaceVM: SvtWorkplaceViewModel = {
        ...workplace,
        workplace_type: wpTypeEntities[workplace.workplace_type_id],
        workplace_count: wpCountEntities[workplace.workplace_count_id],
      };

      return {
        ...item,
        type: typeEntities[item.type_id],
        workplace: workplaceVM,
      };
    })
);

export const getSelectedSvtItem = createSelector(
  SvtItemSelectors.getSelected,
  SvtTypeSelectors.getEntities,
  SvtWorkplaceSelectors.getEntities,
  SvtWorkplaceTypeSelectors.getEntities,
  SvtWorkplaceCountSelectors.getEntities,
  (item, typeEntities, wpEntities, wpTypeEntities, wpCountEntities): SvtItemViewModel => {
    const workplace: SvtWorkplace = wpEntities[item.workplace_id];
    const workplaceVM: SvtWorkplaceViewModel = {
      ...workplace,
      workplace_type: wpTypeEntities[workplace.workplace_type_id],
      workplace_count: wpCountEntities[workplace.workplace_count_id],
    };

    return {
      ...item,
      type: typeEntities[item.type_id],
      workplace: workplaceVM,
    };
  }
);
