import { ModelBuilder } from './model.builder';

import { HostFilter, HostFilterTypes } from './../../entities/filter.interface';

export class HostFilterBuilder extends ModelBuilder<HostFilter> {
  constructor() {
    super();

    this.model = {
      idfield: null,
      id: null,
    };
  }

  idField(idField: HostFilterTypes): HostFilterBuilder {
    this.model.idfield = idField;

    return this;
  }

  id(id: string): HostFilterBuilder {
    this.model.id = id;

    return this;
  }
}
