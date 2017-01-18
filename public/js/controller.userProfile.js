angular.module('Cooking')
  .controller('profileCtrl', profileCtrl)

profileCtrl.$inject = ["$routeParams", "$http"];

//again, $routeParams is basically req.params(backend) for Angular(frontend routing)

function profileCtrl ($routeParams, $http) {
  var pCtrl = this;
  
  console.log($routeParams); //console log everything to help with debugging
  pCtrl.getUserProfile = function(){
    $http({
      method  : 'GET',
      url     : '/api/users/' + $routeParams.id
    }) .then(function(response){
      pCtrl.user = response.data;
    })
    }
  
  pCtrl.getUserProfile();   //you must always call your controller function
  
  
}