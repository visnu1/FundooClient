import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTitleInput]'
})
export class TitleInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input') onInput() {
    if (this.el.nativeElement.innerText === "") {
      this.el.nativeElement.style = "yellow"
    }
  }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.highlight(null);
  // }

  // private highlight(color: string) {
  //   this.el.nativeElement.style.backgroundColor = color;
  // }

}
