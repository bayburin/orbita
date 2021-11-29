import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'service-desk-ui-free-claim-page',
  templateUrl: './free-claim.page.html',
  styleUrls: ['./free-claim.page.scss'],
})
export class FreeClaimPageComponent {
  constructor(private router: Router) {}

  onSave() {
    this.router.navigate(['/claims']);
  }
}
