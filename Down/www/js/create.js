angular.module('downForIt.controllers')
.controller('CreateEventCtrl', function($scope, $cordovaGeolocation, TwitterLib, Posts){

  $scope.newEvent = {
    what: '',
    where: '',
    when: null
  };
//#camping @ #yosemite! Who's #down4it? #5ppl #12pm #y2015m03d01
  $scope.tweet = function() {
    message = {};

     message.status =' #' + $scope.newEvent.what.split(' ').join(' #');

    if ($scope.newEvent.where) {
      message.lat = $scope.newEvent.where.geometry.location.k;
      message.long = $scope.newEvent.where.geometry.location.D;
      // message.place_id = $scope.newEvent.location.place_id;
      message.status += ' @' + $scope.newEvent.where.address_components[0].short_name.split(' ').join('')+'!';
    }

     message.status += 'Who\'s #downforit? @BBYOpen';
     
     message.status += moment($scope.newEvent.date).format(' #MMMD');
     message.status += moment($scope.newEvent.time).format(' #ha');

    

    $scope.error = message; alert(message);
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