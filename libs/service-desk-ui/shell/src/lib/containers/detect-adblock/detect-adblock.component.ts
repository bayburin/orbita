import { Component, OnInit } from '@angular/core';
import { AppFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-detect-adblock',
  templateUrl: './detect-adblock.component.html',
  styleUrls: ['./detect-adblock.component.scss'],
})
export class DetectAdblockComponent implements OnInit {
  constructor(private appFacade: AppFacade) {}

  ngOnInit(): void {
    const iframe = document.createElement('iframe');

    iframe.height = '1px';
    iframe.width = '1px';
    iframe.id = 'ads-text-iframe';
    iframe.src = 'https://lk.iss-reshetnev.ru/ads.html';
    document.body.appendChild(iframe);

    setTimeout(() => {
      const checkFrame = document.getElementById('ads-text-iframe');

      if (
        checkFrame.style.display === 'none' ||
        checkFrame.style.display === 'hidden' ||
        checkFrame.style.visibility === 'hidden' ||
        checkFrame.offsetHeight == 0
      ) {
        this.appFacade.detectAdBlock(true);
      }
      iframe.remove();
    }, 1000);
  }
}
