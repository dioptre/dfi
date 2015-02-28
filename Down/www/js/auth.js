angular.module('downForIt.controllers')
.controller('LoginCtrl', function($scope, TwitterLib, $state){

  $scope.login = function(){
    TwitterLib.init().then(function (_data) {
      //the whole data
      $state.go('tab.home');
    });
  };

  $scope.logout = function(){
    TwitterLib.logOut();
  };

})

.controller('LogoutCtrl', function($scope, TwitterLib, $state){

  TwitterLib.logOut();
  $state.go('login');

});