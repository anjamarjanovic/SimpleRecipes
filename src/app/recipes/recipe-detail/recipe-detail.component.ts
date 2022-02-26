import { RecipesService } from './../recipes.service';
import { Recipe } from './../recipe-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;
  constructor( private recipesService:RecipesService,
    private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.recipe = this.recipesService.getRecipe(this.id)
    })
  }
onAddToShoppingList(){
  this.recipesService.addIngrToShoppingList(this.recipe.ingredients)
}

}
