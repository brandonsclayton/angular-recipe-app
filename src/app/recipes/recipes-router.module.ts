import { NgModule } from '@angular/core';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGaurd } from '../auth/auth-gurad.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RouterModule } from '@angular/router';

const recipeRoutes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGaurd] },
      { path: ':id', component: RecipeDetailComponent },
      {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGaurd] }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(recipeRoutes) ],
  exports: [ RouterModule ]
})
export class RecipeRouter {

}
