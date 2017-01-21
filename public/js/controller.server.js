//SERVER CONTROLLER//
angular.module('Cooking')
  .controller('server', serverCtrl)

serverCtrl.$inject = ['$routeParams', '$http'];

function serverCtrl ($routeParams, $http) {

  var sCtrl = this;

//new way using $http
  sCtrl.addRecipe = ()=> {
    console.log(sCtrl); //console log everything to make sure it wokrs and to debug
    $http({
      method    : 'POST',
      url       : '/api/recipes',
      data      : sCtrl.newRecipe
    }) .then(function(response){
      console.log(response);
    });
  }

  sCtrl.submitUser = ()=> {
    console.log(sCtrl);
    $http({
      method    : 'POST',
      url       : '/register',
      data      : sCtrl.newUser
    }) .then(function(response){
      console.log(response);
    });
  }

  sCtrl.login = ()=> {
    console.log(sCtrl);
    $http({
      method    :'POST',
      url       : '/login',
      data      : sCtrl.loginUser
    }) .then(function(response){
      document.getElementById('id01').style.display='none'  //this clears the modal after hiiting login button.  It's attached to the modal on-click
       location.href ='/#!/profiles/' + response.data._id
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

  sCtrl.getRecipes = function(){
    $http({
      method    : 'GET',
      url       : '/api/recipes'
    }) .then(function(response){
      sCtrl.recipes = response.data;
      console.log(response);
    });
  }

  sCtrl.getUsers = function(){
    $http({
      method    : 'GET',
      url       :'/api/users'
    }).then(function(response){
      sCtrl.users = response.data;
    });
  }

  sCtrl.getProfile = function(){
    $http({
      method    :'GET',
      url       :'/api/users/' + $routeParams.id
    }) .then(function(response){
      sCtrl.user = response.data;
    });
  }

  sCtrl.getFamilies= function(){
    $http({
      method : 'GET',
      url    : '/api/families'
    }).then(function(response){
      sCtrl.familyList = response.data;

    });
  }

  sCtrl.getUsers();  //you must call your get funcitons
  sCtrl.getRecipes();
  sCtrl.getFamilies();
  
  if($routeParams.id){
    sCtrl.getProfile();
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
