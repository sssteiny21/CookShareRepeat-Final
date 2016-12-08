//routing directive for cooksharerepeat//
angular.module('Recipes', ['ngRoute']);

// In order to use ngRoute as our router, we have to define what routes it should be looking for
angular.module('Recipes')
  .config(Router);

Router.$inject = ['$routeProvider']; // Inject component from ngRoute

function Router ($routeProvider) {
  
  $routeProvider
    .when('/', {
      templateUrl   : '/home.html', // URL on your server that leads to an html file to be used for this page
      controller    : 'mainpage', // String name of the angular controller you would like to use on this page
      controllerAs  : 'hCtrl'  // Object name for `this` in your html from the specified controller 
  })
    .when('/aboutus', {
      templateUrl   : '/aboutus.html',
    })
    .when('/families', {
      templateUrl   : '/families.html',    
    })
    .when('/recipeoftheday', {
      templateUrl   : '/recipeoftheday.html',      
    })
    .when('/searchingredients', {
      templateUrl   : '/searchingredients.html',       
    })
    .when('/blog', {
      templateUrl   : '/blog.html',      
    })
    .when('/contactus', {
      templateUrl   : '/contactus.html',      
    })
  
}

angular.module('Recipes')
  .controller('mainpage', main)

function main () {
  var hCtrl = this;
  
  hCtrl.greeting = "Welcome to your new favorite Recipe Site";
  
}




// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
