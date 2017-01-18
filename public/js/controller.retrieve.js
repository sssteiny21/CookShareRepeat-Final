//RECIEVE CONTROLLER//
angular.module('Recipes')
  .controller('retrieve', retrieveCtrl)

retrieveCtrl.$inject = ['$routeParams', '$http'];

function receiving ($routeParams, $http) {
  
  var rCtrl = this;
  
  rCtrl.getRecipe = function(){
    $http({
      method    : 'GET',
      url       : '/api/users'
    }) .then(function(response){
      rCtrl.recipes = response.data;
      console.log(response);
    });
  }
  rCtrl.getUser = function(){
    $http({
      method    : 'GET',
      url       :'/api/users'
    }).then(function(response){
      rCtrl.users = response.data;
    });
  }
  rCtrl.getFamily = function(){
    $http({
      method  :'GET',
      url     :'/api/families'
    }) .then(function(response){
      rCtrl.familyList = response.data
      console.log(response);
    });
  }
}
