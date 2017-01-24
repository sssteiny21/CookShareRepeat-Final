//SERVER CONTROLLER//
angular.module('Cooking')
  .controller('server', serverCtrl)

serverCtrl.$inject = ['$routeParams', '$http', '$location'];

function serverCtrl ($routeParams, $http, $location) {

  var sCtrl = this;

//new way using $http
//post controllers

  sCtrl.addRecipe = ()=> {
    console.log(sCtrl); //console log everything to make sure it wokrs and to debug
    $http({
      method    : 'POST',
      url       : '/api/recipes',
      data      : sCtrl.newRecipe
    }) .then(function(response){
      $location.url('/recipeoftheday');  //you can handle this route here instead of in your html file
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
      $location.url('/aboutus');
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

//get controllers

  sCtrl.getRecipes = function(){
    $http({
      method    : 'GET',
      url       : '/api/recipes'
    }) .then(function(response){
      sCtrl.recipes = response.data;
      console.log(response);
    });
  }
  /*sCtrl.getOneRecipes = function(){
    $http({
      method    : 'GET',
      url       : '/api/recipes' + $routeParams.creator
    }) .then(function(response){
      sCtrl.creatorRecipes = response.data;
      console.log(response);
    });
  } */


  sCtrl.recentRecipe = function(){
    $http({
      method  : 'GET',
      url     :'/api/recipes/' + $routeParams.id
    }) .then(function(response){
      sCtrl.recentRecipe = response.data;
    });
  }

//controller to input recipe data in profile page
  sCtrl.getCreatorRecipe = function(id){
    $http({
      method   : 'GET',
      url      : '/api/recipes/',
      params  : {
        //these are query string parameters
        creator: id
      }
    }) .then(function(response){
      sCtrl.creatorRecipes = response.data;
    })
  }

  sCtrl.profileRecipes = function(){
    $http({
      method  :'GET',
      url     : '/api/me/',
      }) .then(function(response){
      sCtrl.profile = response.data
      sCtrl.getCreatorRecipe(sCtrl.profile._id);
    })
  }

/*API Get request
  sCtrl.getApiRecipes = function(){
    $http({
      method:'GET',
      url   :'/api/search/' + $routeParams.id
    }) .then(function(response){
      //console.log('Recipe time : ', response.data)
      sCtrl.recipe = response.data;
    });

  } */

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

  sCtrl.getFamilyPages= function(){
    $http({
      method : 'GET',
      url    : '/api/families/' + $routeParams.id
    }) .then(function(response){
      sCtrl.family = response.data;
    });
  }

  sCtrl.getFamilyUsers= function(){
    $http({
      method  :'GET',
      url     :'/api/users/',//this must match our routes path
      params  : {
        //these are query string parameters
        family: $routeParams.id
      }
    }) .then(function(response){
      sCtrl.familyUsers = response.data;
    })
  }

  sCtrl.getUsers();  //you must call your get funcitons
  sCtrl.getRecipes();
  sCtrl.getFamilies();
  //sCtrl.getApiRecipes();
  //sCtrl.getCreatorRecipe ();

  if($routeParams.id){  //this runs when $routeParams is requested
    sCtrl.getProfile();
    sCtrl.getFamilyPages();
    sCtrl.getFamilyUsers();
    sCtrl.getCreatorRecipe($routeParams.id);
  }
  else{
    sCtrl.profileRecipes();

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
