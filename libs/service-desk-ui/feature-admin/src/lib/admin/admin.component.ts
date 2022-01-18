import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { primeLocale } from '@orbita/service-desk-ui/ui';

@Component({
  selector: 'lib-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private config: PrimeNGConfig) {}

  ngOnInit(): void {
    this.config.setTranslation(primeLocale);
  }
}
