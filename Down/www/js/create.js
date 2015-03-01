angular.module('downForIt.controllers')
.controller('CreateEventCtrl', function($scope, $cordovaGeolocation, TwitterLib, Posts){

  $scope.newEvent = {
    what: '',
    where: '',
    date: new Date(),
    time: new Date(moment().add(1, 'hour'))
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
     
     if ($scope.newEvent.date)
       message.status += moment($scope.newEvent.date).format(' #MMMD');
     if ($scope.newEvent.time)
       message.status += moment($scope.newEvent.time).format(' #ha');

    TwitterLib.tweet(message).then(function(response){
      alert('Event Tweeted!');
      $state.go('tab.posts');
    });
  };

});