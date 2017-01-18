//routing directive for cooksharerepeat//
angular.module('Cooking', ['ngRoute'])
  .config(Router);  // In order to use ngRoute as our router, we have to define what routes it should be looking for

Router.$inject = ['$routeProvider']; // Inject component from ngRoute

function Router ($routeProvider) {
console.log("hello")  
  
  $routeProvider
    .when('/', {
      templateUrl   : '/html//home.html', // URL on your server that leads to an html file to be used for this page
      controller    : 'homePage', // String name of the angular controller you would like to use on this page
      controllerAs  : 'sCtrl'  // Object name for `this` in your html from the specified controller 
  })
    .when('/aboutus', {
      templateUrl   : '/html/aboutus.html',
      controller    : 'aboutus',
      controllerAs  : 'aCtrl'
    })
    .when('/families', {
      templateUrl   : '/html/families.html',
      controller    : 'families',
      controllerAs  : 'rCtrl'
    })
    .when('/recipeoftheday', {
      templateUrl   : '/html/recipeoftheday.html',  
      controller    : 'receive',
      controllerAs  : 'rCtrl'
    })
    .when('/submitrecipe', {
      templateUrl   : '/html/submitrecipe.html',
      controller    : 'submit',
      controllerAs  : 'sCtrl'
    })
    .when('/blog', {
      templateUrl   : '/html/blog.html',      
    })
    .when('/contactus', {
      templateUrl   : '/html/contactus.html',      
    })
  
}


//WELCOME PAGE MESSAGE CONTROLLER
angular.module('Cooking')
  .controller('homePage', main)

function main () {
  var hCtrl = this;
  
  hCtrl.greeting = "Welcome to your new favorite Recipe Site";
  hCtrl.content = " ";
  
}


// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
