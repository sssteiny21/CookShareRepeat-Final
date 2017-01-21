angular.module('Cooking')
  .factory('API', apiFact);

apiFact.$inject = ['$http'];

function apiFact ($http) {

//   function getTest (){
//     return $http({
//       method : 'GET',
//       url : '/test'
//     })
//   }

  function getRecipe(recipe){

    return $http({
      method : 'GET',
      url : '/api/search',
      params : {
        recipe : recipe
      }
    })

  }

  return {
    getRecipe : getRecipe
    //     getTest : getTest
  }
}
