import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient-model';
import { Recipe } from './recipe-model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
recipeSelected = new EventEmitter<Recipe>();
  private recipes:Recipe[] = [
    new Recipe('Hamburger','Everything you need right now','https://media.istockphoto.com/photos/cheeseburger-isolated-on-white-picture-id1157515115?k=20&m=1157515115&s=612x612&w=0&h=1-tuF1ovimw3DuivpApekSjJXN5-vc97-qBY5EBOUts=', [
      new Ingredient('Buns',2),
      new Ingredient('Meat',1),
      new Ingredient('Cucamber',1),
      new Ingredient('Tomato',1),
      new Ingredient('Cheese',2)
    ] ),
    new Recipe('Carbonara Pasta', 'Escape to Italy in 20 minutes','https://media.istockphoto.com/photos/spaghetti-alla-puttanesca-italian-pasta-dish-with-tomatoes-black-picture-id1325172440?b=1&k=20&m=1325172440&s=170667a&w=0&h=WS2gPeU01_yzJYsiaHBhOSfrHVKMn-kBxzgsz61a2p8=', [
      new Ingredient('Spaghetti',20),
      new Ingredient('Egg',1),
      new Ingredient('Bacon',4),
      new Ingredient('Pancheta',1),
      new Ingredient('Parmesan',1)
    ]),
    new Recipe('German Schnitzel', 'A super tasty Schnitzel.','https://media.istockphoto.com/photos/schnitzel-and-fried-potatoes-picture-id603258520?k=20&m=603258520&s=612x612&w=0&h=NF7aWLkDZEWAqFIScubghELMxjXIo1i5Wdl2cShSX-s=', [
      new Ingredient('Meat',1),
      new Ingredient('Franch Fries',20),
      new Ingredient('Tomato',4),
     
    ])
  ];
constructor(private slService:ShoppingListService) { }

getRecipes(){
  return this.recipes.slice();
}

getRecipe(index:number){
  return this.recipes[index];
}


addIngrToShoppingList(ingredients:Ingredient[]){
this.slService.addIngredients(ingredients)
}
}
