import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'input[toUpperCase]'
})
export class ToUpperCaseDirective {
  constructor(private el: ElementRef) {
    console.log('to-upper-case.directive - constructor - ElementRef:', el);
  }

  @HostListener('keydown', ['$event'])
  private onKeyDown(event: { target: { [x: string]: string; }; key: string; preventDefault: () => void; } | null | undefined) {
    if(event !== null && event !== undefined) {
      if(event?.target['value'] !== null && event?.target['value'] !== undefined) {
        event.target['value'] = event.target['value'].toUpperCase();
      } else {
          event?.preventDefault();
      }
    }
  }
}
