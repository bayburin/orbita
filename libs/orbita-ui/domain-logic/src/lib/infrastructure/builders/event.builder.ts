import { ModelBuilder } from './model.builder';
import { Event } from './../../entities/models/event.interface';
import { EventTypeNames } from './../../entities/models/event-type.interface';

export class EventBuilder extends ModelBuilder<Event> {
  constructor() {
    super();

    this.model = {
      claim_id: null,
      event_type: null,
    };
  }

  claim_id(claimId: number): EventBuilder {
    this.model.claim_id = claimId;

    return this;
  }

  event_type(eventType: EventTypeNames): EventBuilder {
    this.model.event_type = eventType;

    return this;
  }
}
