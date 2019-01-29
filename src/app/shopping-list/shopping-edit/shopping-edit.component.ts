import {
    Component,
    OnInit,
    ViewChild,
    OnDestroy} from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild('shoppingForm') shoppingForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);

        this.shoppingForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        });
      });
  }

  onAdd() {
    const name = this.shoppingForm.value['name'];
    const amount = this.shoppingForm.value['amount'];

    this.shoppingListService.addIngredient(new Ingredient(name, amount));
  }

  onClear() {
    this.shoppingForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
