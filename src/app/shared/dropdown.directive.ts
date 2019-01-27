import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  constructor() { }

  @HostListener('click') dropdown() {
    this.isOpen = !this.isOpen;
  }
}
