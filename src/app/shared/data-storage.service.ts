import { AuthService } from './../auth/auth.service';
import { Ingredient } from './ingredient-model';
import { RecipesService } from './../recipes/recipes.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe-model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private recipeService:RecipesService, private authService:AuthService) { }

storeRecipes(){
  const recipes = this.recipeService.getRecipes();
  this.http.put('https://simplerecipes-290d7-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe((response) =>{
    console.log(response)
  });
}

fetchRecipes(){
    return this.http
    .get<Recipe[]>('https://simplerecipes-290d7-default-rtdb.firebaseio.com/recipes.json')
    .pipe(
  map(recipes=>{
    return recipes.map(recipe=> {
      return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
      };
      })
    }),
    tap((recipes)=>{ this.recipeService.setRecipes(recipes) })

    )}



 }

