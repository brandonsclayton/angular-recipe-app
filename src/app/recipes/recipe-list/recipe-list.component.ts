import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
        'My Recipe',
        'Some food',
        'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'),
    new Recipe(
        'ANother My Recipe',
        'Some food',
        'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'),
  ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }
  
  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
