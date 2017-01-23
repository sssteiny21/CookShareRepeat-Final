//RECIPE FACTORY//
angular.module('Cooking')
  .factory('Recipes', apiRecipes);

apiRecipes.$inject = ["$http"];

function apiRecipes ($http) {

    function getRecipe(recipe){

      return $http({
        method :'GET',
        url    :'/api/search/',
        params : {
          recipe : recipe
        }
      })
    }

      //ALL FACTORIES MUST HAVE A RETURN STATEMENT
      return {
        getRecipe : getRecipe
      //}$http.get('/api/recipes')
    }
  }
