import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { ClaimI } from '../../../core/interfaces/claim.interface';
import { contentListAnimation } from '../../../core/animations/content.animation';

@Component({
  selector: 'service-desk-ui-claim-card-list',
  templateUrl: './claim-card-list.component.html',
  styleUrls: ['./claim-card-list.component.scss'],
  animations: [contentListAnimation],
})
export class ClaimCardListComponent implements OnChanges {
  @Input() claims: ClaimI[] = [];
  @Input() loading = false;
  @Output() removeClaim = new EventEmitter<any>();
  data: any[] = [];

  ngOnChanges() {
    this.data = [];
    for (let i = 0; i < this.claims.length; i += 2) {
      this.data.push(this.claims.slice(i, i + 2));
    }
  }

  /**
   * Событие отмены заявки.
   */
  revoke(): void {
    this.removeClaim.emit(true);
  }

  trackByClaim(index: number, claim: ClaimI) {
    return claim.case_id;
  }
}
