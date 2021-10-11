import { createSelector } from '@ngrx/store';

import * as SdTicketSelectors from '../sd-ticket/sd-ticket.selectors';
import * as SdServiceSelectors from '../sd-service/sd-service.selectors';
import * as UserSelectors from '../user/user.selectors';
import { SdTicketViewModel } from './../../../entities/view-models/sd-ticket-view-model.interface';

export const getAllFreeApplicationsViewModel = createSelector(
  SdTicketSelectors.getAllFreeApplications,
  SdServiceSelectors.getEntities,
  UserSelectors.getAll,
  (tickets, serviceEntities, users): SdTicketViewModel[] =>
    tickets.map((ticket) => ({
      ...ticket,
      service: serviceEntities[ticket.service_id],
      responsible_users: users.filter((user) => ticket.responsible_users.some((u) => u.tn === user.tn)),
    }))
);
