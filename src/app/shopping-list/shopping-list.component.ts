import { Ingredient } from './../shared/ingredient-model';
import { ShoppingListService } from './shopping-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {
ingredients:Ingredient[];
private idChangeSub:Subscription;
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredient();
     this.idChangeSub = this.slService.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients = ingredients;
    })
  }
ngOnDestroy(): void {
    this.idChangeSub.unsubscribe();
}
onEditItem(index:number){
  this.slService.startedEditing.next(index);
}
}
