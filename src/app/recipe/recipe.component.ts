import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  errorMessage: string;
  recipeInfo: any =[];
  title: string;
  ingrediantArr: any = [];
  thumbNail: string;
  description: string;
  instructionsArr: any = [];
  tagsArr: any = [];
  checkTags: boolean;
  separateTags: [];
  videoSrc: string;
  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.getRecipeData();
  }

  getRecipeData() {
    this.api.getRecipeData().subscribe((response: any) => {
      console.log('Response:', response);
      const body = response.meals[0];
      console.log('Body:', body);
      this.title = body.strMeal;
      this.thumbNail = body.strMealThumb;
      this.description = "Ham drumstick swine turducken tail beef meatball. Ground round tongue filet mignon brisket pork. Shoulder ham hock filet mignon doner sausage buffalo capicola, chuck sirloin bresaola bacon jerky flank boudin ham.";
      this.videoSrc = body.strYoutube;
      for (let i = 1; i <= 20; i++) {
        if (body['strIngredient' + i] && body['strIngredient' + i] != "") {
          this.ingrediantArr.push(body['strIngredient' + i]);
        }
      }

      const separateInstructions = body.strInstructions.split(". ");
      this.instructionsArr.push(separateInstructions);


      if (!(body.strTags == null)) {
        this.checkTags = true;
        this.separateTags = body.strTags.split(",")
      }
    },
      (error: any) => {
        this.errorMessage = 'Unable to retrieve recipe. Please try again.';
      });
  }
}
