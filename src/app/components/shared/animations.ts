import { trigger, state, style, transition, animate } from '@angular/animations'

export function slideUp() {
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

export const slideDown = () => {
  return trigger('slideDown', [
    state(
      'out',
      style({
        opacity: 0,
        visibility: 'hidden',
        transform: 'translateY(-100%)',
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

export const slideRight = () => {
  return trigger('slideRight', [
    state(
      'out',
      style({
        opacity: 0,
        visibility: 'hidden',
        transform: 'translateX(-100%)',
      })
    ),
    state(
      'in',
      style({
        opacity: 1,
        transform: 'translateX(0)',
      })
    ),

    transition('out <=> in', animate(300)),
  ])
}

export const slideDownChunk = () => {
  return trigger('chunkDown', [
    state(
      'in',
      style({
        opacity: 1,
        transform: 'translateY(0)',
      })
    ),

    transition('void => *', [
      style({ opacity: 0, transform: 'translateY(-20%)' }),
      animate('150ms'),
    ]),
  ])
}
