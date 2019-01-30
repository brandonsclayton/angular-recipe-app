import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';


@Injectable({providedIn: 'root'})
export class FirebaseService {

  private firebaseUrl = 'https://udemy-ng-recipe-app-a0795.firebaseio.com/';
  private recipeUrl = `${this.firebaseUrl}recipes.json`;

  constructor(
      private recipeService: RecipeService,
      private http: Http,
      private authService: AuthService) {}

  saveRecipes() {
    const token = this.authService.getToken();

    return this.http.put(
        `${this.recipeUrl}?auth=${token}`,
        this.recipeService.getRecipes());
  }

  fetchRecipes() {
    const token = this.authService.getToken();

    this.http.get(`${this.recipeUrl}?auth=${token}`)
      .pipe(map(res => {
        const recipes: Recipe[] = res.json();

        recipes.forEach((recipe) => {
          if (!recipe['ingredients']) {
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        });

        return recipes;
      }))
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }

}
