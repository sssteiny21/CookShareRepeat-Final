//RECIPE FACTORY//
angular.module('Cooking')
  .factory('Recipes', Recipes);   

Recipes.$inject = ["$http"];
           
function Recipes ($http) {
  
  return {
    
    get : function(){
      
      //ALL FACTORIES MUST HAVE A RETURN STATEMENT
      return $http.get('/api/recipes')
    }
  }
}
  

