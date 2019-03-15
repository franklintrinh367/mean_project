import { trigger, state, style, transition, animate } from '@angular/animations'

export const slideUp = () => {
  return trigger('slideUp', [
    state(
      'out',
      style({
        opacity: 0,
        transform: 'translateY(20%)',
        visibility: 'hidden',
      })
    ),

    state(
      'in',
      style({
        opacity: 1,
        transform: 'translateY(0)',
      })
    ),

    transition('out => in', animate('300ms')),
  ])
}
