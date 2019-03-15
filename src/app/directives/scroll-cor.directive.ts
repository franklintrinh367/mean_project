import {
  Directive,
  HostBinding,
  HostListener,
  OnInit,
  ElementRef,
} from '@angular/core'

@Directive({
  selector: '[appScrollCor]',
})
export class ScrollCorDirective implements OnInit {
  @HostBinding('@slideUp') state = 'out'
  elCorY

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.elCorY = this.el.nativeElement.offsetTop
    this.elCorY = this.elCorY + this.elCorY / 4
  }

  @HostListener('window: scroll', ['$event'])
  onscroll() {
    let currentCorY = window.pageYOffset + window.innerHeight
    if (currentCorY > this.elCorY) {
      this.state = 'in'
    }
  }
}
