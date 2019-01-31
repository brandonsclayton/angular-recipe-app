import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class FirebaseService {

  private firebaseUrl = 'https://udemy-ng-recipe-app-a0795.firebaseio.com/';
  private recipeUrl = `${this.firebaseUrl}recipes.json`;

  constructor(
      private recipeService: RecipeService,
      private httpClient: HttpClient,
      private authService: AuthService) {}

  saveRecipes() {
    return this.httpClient.put(
        this.recipeUrl,
        this.recipeService.getRecipes());
  }

  fetchRecipes() {
    this.httpClient.get<Recipe[]>(
      this.recipeUrl)
      .pipe(map(recipes => {
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
