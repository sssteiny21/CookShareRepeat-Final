angular.module('Cooking')
  .controller('homePage', main)

function main (API) {
  var hCtrl = this;

  hCtrl.greeting = "Welcome to your new favorite Recipe Site";
  hCtrl.content = " ";

//API FUNCTION
  hCtrl.getThatRecipe = function(){

    API.getRecipe(hCtrl.recipeInput)
      .then(function(resp){
        console.log('Recipe time : ', resp.data)
        hCtrl.recipe = resp.data.recipes;
      });

  }

}
