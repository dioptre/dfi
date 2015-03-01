angular.module('downForIt.controllers')
.controller('CreateEventCtrl', function($scope, $cordovaGeolocation, TwitterLib, Posts){

  $scope.newEvent = {
    what: '',
    where: '',
    when: null
  };

  $scope.tweet = function() {
    message = {
      'status': '#down4it'
    };


     message.status += ' #' + $scope.newEvent.what.split(' ').join(' #');

     var when = new Date($scope.newEvent.when);

     message.status += ' #d' + when.getDate() + 'm' + (when.getMonth() + 1)


    if ($scope.newEvent.where) {
      message.lat = $scope.newEvent.where.geometry.location.k;
      message.long = $scope.newEvent.where.geometry.location.D;
      // message.place_id = $scope.newEvent.location.place_id;
      message.status += ' #' + $scope.newEvent.where.address_components[0].short_name.split(' ').join('');
    }

    $scope.error = message;
    TwitterLib.tweet(message).then(function(response){
      $scope.error = response;
    }, function(error){
      $scope.error = error;
    });
  };

  $scope.cancel = function() {
    $scope.modal.hide();
  };
})