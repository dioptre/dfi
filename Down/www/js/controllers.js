angular.module('downForIt.controllers', [])

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    directMessage: true,
    discover: true,
    newEvent: true,
    location: 'San Francisco'
  };

})

.controller('CreateEventCtrl', function($scope, $cordovaGeolocation, TwitterLib, Posts){

  $scope.newEvent = {
    text: '',
    description: '',
    location: null
  };

  $scope.test = function(){
    Posts.update($scope.newEvent.text).then(function(err){
      $scope.error = err;
    },function(err){
      $scope.error = err;
    });
  };

  $scope.tweet = function() {
    message = {
        'status': $scope.newEvent.text,
    };

    if (!~message.status.toLowerCase().indexOf('#downforit')) {
      message.status = '#downforit ' + message.status;
    }

    if ($scope.newEvent.location) {
      message.lat = $scope.newEvent.location.geometry.location.k;
      message.long = $scope.newEvent.location.geometry.location.D;
      // message.place_id = $scope.newEvent.location.place_id;
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

.controller('PostsCtrl', function($scope, Posts, user, TwitterLib) {
    TwitterLib.myEvents(user).then(function (arg) {
      $scope.data = arg;
    }, function(error){
      //alert(JSON.stringify(error))
    });
    $scope.posts = Posts.all();
    $scope.items = [];
})