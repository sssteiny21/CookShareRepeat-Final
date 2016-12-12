//routing directive for cooksharerepeat//
angular.module('Recipes', ['ngRoute']);

// In order to use ngRoute as our router, we have to define what routes it should be looking for
angular.module('Recipes')
  .config(Router);

Router.$inject = ['$routeProvider']; // Inject component from ngRoute

function Router ($routeProvider) {
console.log("hello")  
  $routeProvider
    .when('/', {
      templateUrl   : '/home.html', // URL on your server that leads to an html file to be used for this page
      controller    : 'mainpage', // String name of the angular controller you would like to use on this page
      controllerAs  : 'hCtrl'  // Object name for `this` in your html from the specified controller 
  })
    .when('/aboutus', {
      templateUrl   : '/aboutus.html',
      controller    : 'aboutus',
      controllerAs  : 'aCtrl'
    })
    .when('/families', {
      templateUrl   : '/families.html',    
    })
    .when('/recipeoftheday', {
      templateUrl   : '/recipeoftheday.html',  
      controller    : 'receive',
      controllerAs  : 'rCtrl'
    })
    .when('/submitrecipe', {
      templateUrl   : '/submitrecipe.html',
      controller    : 'submit',
      controllerAs  : 'sCtrl'
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
  hCtrl.content = " ";
  
}

//SUBMIT and RECIEVE RECIPE PROCESS

//SUBMIT CONTROLLER//
angular.module('Recipes')
  .controller('submit', submission)

submission.$inject = ["RecipeFactory"];

function submission (RecipeFactory) {
  
  var sCtrl = this;
  
sCtrl.thingsinrecipe = RecipeFactory.things;
sCtrl.newRecipe = {}
console.log(sCtrl)
sCtrl.addRecipe = function(){
  console.log("Adding new recipe...")
  sCtrl.thingsinrecipe.push(sCtrl.newRecipe);
  sCtrl.newRecipe = {};
}
}


//RECIEVE CONTROLLER//
angular.module('Recipes')
  .controller('receive', receiving)

receiving.$inject = ["RecipeFactory"];

function receiving (RecipeFactory) {
  
  var rCtrl = this;
  console.log("RecipeFactory", RecipeFactory)
rCtrl.thingsinrecipe = RecipeFactory.things;
}



//RECIPE FACTORY//
angular.module('Recipes')
  .factory("RecipeFactory", listFactory);
           
function listFactory () {
  var thingsinrecipe = [
    {
      name : "Corn and Black Bean Salsa",
      creator : "Stoney",
      email : "sIcelander@aol.com", 
      ingredients : [
        "Home Grown Tomatoes, Peppers (Habanero, Jalepeno,Serrano,Chili, Cherry           Bomb Thai, Heat Wave, Hungarian Wax, 6 kinds of sweet peppers.). Corn,           Black Beans, Tomato Paste,Onions, Salt, Red Wine Vinegar, Brown Sugar,           Lime Juice, Spices" ],
      directions : ["dice all ingredients and pressure can accordingly"],
    },
    {
      name : "Corn Dip with Tortilla Chips",
      creator : "Glenna",
      email : "glenna1948",
      ingredients : [
          "2 Cans whole kernel corn, drained",
          "1 to 1.5 c. mayonnaise (not Miracle Whip)",
          "1/4 tsp. cumin or to taste",
          "1 jalepeno pepper, seeded and chopped fine",
          "1 sweet onion, chopped",
          "2 c. shredded Mexican cheese",
          "Lime taco chips or plain taco chips" ],
      directions :["Mix corn, mayonnaise, cumin, jalepeno pepper, onion and             cheese together. Chill and serve with chips.",],
    },
    {
      name : "Buffalo Chicked Dip",
      creator : "Steiny",
      email : "sssteiny21@gmail.com",
      ingredients : [
        "2 cups shredded cooked chicken", 
        "1 (8 oz. pkg.) cream cheese, softened",
        "1/2 cup FRANK'S RedHot® Original Cayenne Pepper Sauce or FRANK'S RedHot®         Buffalo Wings Sauce", 
        "1/2 cup Hidden Valley® Original Ranch® Dressing",
        "1/2 cup crumbled bleu cheese or your favorite shredded cheese", 
        ],
       directions  :["PREHEAT oven to 350°F. COMBINE all ingredients and spoon into shallow 1-quart baking dish.BAKE 20 minutes or until mixture is heated through; stir. Garnish with chopped green onions if desired. Serve with crackers and/or vegetables.", 
        ],
                     
    },
    
  ];
 
  
  //   ALL FACTORIES MUST HAVE A RETURN STATEMENT!
  return {
    things : thingsinrecipe
  }
  
}










// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
