angular.module('Cooking')
  .controller('familyCtrl', familyCtrl)

familyCtrl.$inject = ["$routeParams", "$http"];  //routeParams is basically req.params(backend) for angular (frontend)

function familyCtrl ($routeParams, $http) {
  var fCtrl = this;
  
  console.log($routeParams); //make sure to console log so you can debug easier
  fCtrl.getFamily = function(){
    $http({
      method : 'GET',
      url    : '/api/families/' + $routeParams.id
    }) .then(function(resp){
      fCtrl.family = resp.data;
    })
  }
  
  fCtrl.getUsers = function(){
    $http({
      method  : 'GET',
      url     : '/api/users',
      params  : {
        //these are query string parameters
        family: $routeParams.id
      }
    }) .then(function(resp){
      fCtrl.familyUsers = resp.data;
    })
  }
  // api/users?region=654649898  (this is the query string url)
  fCtrl.getFamily();
  fCtrl.getUsers();
}