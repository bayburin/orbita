import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { contentBlockAnimation } from '../../../../../core/animations/content.animation';

@Component({
  selector: 'service-desk-ui-form-info-tab',
  templateUrl: './form-info-tab.component.html',
  styleUrls: ['./form-info-tab.component.sass'],
  animations: [contentBlockAnimation],
})
export class FormInfoTabComponent {
  @Input() ticketForm: FormGroup;

  get form() {
    return this.ticketForm.controls;
  }

  get form_info() {
    return (this.form.form as FormGroup).controls;
  }
}
