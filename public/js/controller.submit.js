//SUBMIT CONTROLLER//
angular.module('Recipes')
  .controller('submit', submission)

submission.$inject = ['$routeParams', '$http'];

function submission ($routeParams, $http) {
  
  var sCtrl = this;
  
//new way using $http
  sCtrl.submitRecipe = ()=> {
    console.log(sCtrl); //console log everything to make sure it wokrs and to debug
    $http({
      method    : 'POST',
      url       : '/api/users',
      data      : sCtrl.newRecipe
    }) .then(function(response){
      console.log(response);
    });
  }
  sCtrl.submitUser = ()=> {
    console.log(sCtrl);
    $http({
      method    : 'POST',
      url       : '/api/users',
      data      : sCtrl.newUser
    }) .then(function(response){
      console.log(response);
    });
  }
  sCtrl.submitFamily = ()=> {
    $http({
      method    : 'POST',
      url       : '/api/families',
      data      : sCtrl.newFamily
    }) .then(function(response){
      console.log(response);
    });
  }
}
  
  
  
  
 /* 
//old way before databases // 
sCtrl.thingsinrecipe = RecipeFactory.things;
sCtrl.newRecipe = {}
console.log(sCtrl)
sCtrl.addRecipe = function(){
  console.log("Adding new recipe...")
  sCtrl.thingsinrecipe.push(sCtrl.newRecipe);
  sCtrl.newRecipe = {};
} */



