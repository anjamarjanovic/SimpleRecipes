import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient-model';
import { Recipe } from './recipe-model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  //Remember slice gave as copy, push is not on the same array, so we use this method
recipesChanged = new Subject<Recipe[]>();
private recipes:Recipe[] = [];

constructor(private slService:ShoppingListService) { }

setRecipes(recipes:Recipe[]){
this.recipes = recipes;
this.recipesChanged.next(this.recipes.slice())

}
getRecipes(){
  return this.recipes.slice();
}

getRecipe(index:number){
  return this.recipes[index];
}


addIngrToShoppingList(ingredients:Ingredient[]){
this.slService.addIngredients(ingredients)
}
addRecipe(recipe:Recipe){
this.recipes.push(recipe)
this.recipesChanged.next(this.recipes.slice())
}
updateRecipe(index:number,newRecipe:Recipe){
this.recipes[index]= newRecipe;
this.recipesChanged.next(this.recipes.slice())

}
deleteRecipe(index:number){
  this.recipes.splice(index,1);
  this.recipesChanged.next(this.recipes.slice())
  
}
}
