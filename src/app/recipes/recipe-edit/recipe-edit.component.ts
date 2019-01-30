import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
      private route: ActivatedRoute,
      private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = + params['id'];
      this.editMode = params['id'] != null;

      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let recipeDecscription = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      recipeDecscription = recipe.description;

      if (recipe['ingredients']) {
        recipe.ingredients.forEach((ingredient) => {
          ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(
                  ingredient.amount,
                  [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        });
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(recipeDecscription, Validators.required),
      'ingredients': ingredients
    });
  }

  onSubmit() {
    const name = this.recipeForm.value['name'];
    const description = this.recipeForm.value['decription'];
    const imagePath = this.recipeForm.value['imagePath'];
    const ingredients = this.recipeForm.value['ingredients'];

    const recipe = new Recipe(name, description, imagePath, ingredients);
    
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,
            [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

}
