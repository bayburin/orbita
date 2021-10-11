import { trigger, style, transition, animate } from '@angular/animations';

export const appHeaderAnimation = trigger('appHeaderAnimation', [
  transition(':enter', [style({ opacity: 0 }), animate('300ms ease-in-out', style({ opacity: 1 }))]),
]);

export const appContentAnimation = trigger('appContentAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(5%)', opacity: 0 }),
    animate('300ms ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 })),
  ]),
]);
