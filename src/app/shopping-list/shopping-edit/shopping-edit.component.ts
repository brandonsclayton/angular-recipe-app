import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameEl: ElementRef;
  @ViewChild('amountInput') amountEl: ElementRef;

  @Output() addIngredient = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAdd() {
    const name = (<HTMLInputElement>this.nameEl.nativeElement).value;
    const amount = Number((<HTMLInputElement>this.amountEl.nativeElement).value);

    this.addIngredient.emit(new Ingredient(name, amount));
  }

}
