import { Recipe } from './../../recipe-model';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input()recipe:Recipe;
@Input()index:number;
  constructor() { }

  ngOnInit(): void {
  }

}
