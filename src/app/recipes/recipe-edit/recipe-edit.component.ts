import { Recipe } from './../recipe-model';
import { RecipesService } from './../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

id:number;
editMode = false;
recipeForm:FormGroup;

constructor(private route:ActivatedRoute, private fb:FormBuilder, private recipeService:RecipesService, private router:Router) {  }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] != null; //in editmode id is present 
      this.initForm();
    })
  }

  private initForm(){
  let recipeName = ''
  let recipeImagePath = '';
  let recipeDescription = '';
  let recipeIngredients = new FormArray([]);

if(this.editMode){
const recipe = this.recipeService.getRecipe(this.id);
recipeName = recipe.name;
recipeImagePath = recipe.imagePath;
recipeDescription = recipe.description;
if(recipe['ingredients']) {
  for(let ingredients of recipe.ingredients){
    recipeIngredients.push(
      this.fb.group({
        'name': [ingredients.name, Validators.required],
        'amount':[ingredients.amount, [Validators.required, Validators.pattern(/^[1-9] + [0-9]*$/)]]
      }) )
  }}}
this.recipeForm = this.fb.group({
  name:[recipeName,Validators.required],
  imagePath:[recipeImagePath,Validators.required],
  description:[recipeDescription,Validators.required],
  ingredients: recipeIngredients
})
}
 onSubmit(){ 
   if(this.editMode){
     this.recipeService.updateRecipe(this.id, this.recipeForm.value)
   } else{
     this.recipeService.addRecipe(this.recipeForm.value)
   }
   this.onCancelRecipe()
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
 onAddingIngredients(){
   (<FormArray> this.recipeForm.get('ingredients')).push(
    this.fb.group({
      'name': [null, Validators.required],
      'amount':[null, [Validators.required, Validators.pattern(/^[1-9] + [0-9]*$/)]]
    })
   )
  }
 onCancelRecipe(){
this.router.navigate(['../'], {relativeTo:this.route})
   }
 
   onDeletingIngredient(index:number){
    (<FormArray> this.recipeForm.get('ingredients')).removeAt(index);
   }



}


