angular.module('downForIt.controllers', [])

.controller('FriendsCtrl', function($scope, Friends, user, $firebase, TwitterLib) {
  $scope.friends = Friends.all();
  //alert(JSON.stringify(tags))
  var ref = new Firebase("https://downforit.firebaseio.com/users/"+user.id);

  var syncUser = $firebase(ref).$asObject();
  syncUser.$bindTo($scope, "user").then(function(){
    // BOUND, data exists!
  });

  var tags = null;
  if ($scope.user && $scope.user.joined)
    tags = Object.key($scope.user.joined); // tags == ['sailing', 'hiking']
  var eventMethods = {
    filterTweets : function(sources) {

    },
    shareEvent : function(id) {
      TwitterLib.shareEvent(id).then(function (arg) {
        
      }, function(error){
        //alert(JSON.stringify(error))
      });
    },
    attendingEvents : function () {
      TwitterLib.attendingEvents().then(function (arg) {
        $scope.data = arg;
        //alert(JSON.stringify(arg))
      }, function(error){
        //alert(JSON.stringify(error))
      });
    },


  }
    eventMethods.attendingEvents();


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

.controller('PostsCtrl', function($scope, Posts, user, TwitterLib, $cordovaGeolocation, $firebase) {

  var ref = new Firebase("https://downforit.firebaseio.com/users/"+user.id);

  var syncUser = $firebase(ref).$asObject();
  syncUser.$bindTo($scope, "user").then(function(){
    // BOUND, data exists!
  });

  var tags = null;
  if ($scope.user && $scope.user.tags)
    tags = Object.key($scope.user.tags); // tags == ['sailing', 'hiking']
  //alert(JSON.stringify(tags))
  var eventMethods = {
    filterTweets : function(sources) {

    },
    upcomingEvents : function () {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        //alert($cordovaGeolocation);
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            //alert(position)
            var message = {};
            message.lat  = position.coords.latitude;
            message.long = position.coords.longitude;
            TwitterLib.upcomingEvents(message).then(function (arg) {
              //alert(JSON.stringify(arg))
              $scope.data = arg;
            }, function(error){
              //alert(JSON.stringify(error))
            });
          }, function(err) {
            TwitterLib.upcomingEvents({lat:37.775 , long: -122.418333333333}).then(function (arg) {
              //alert(JSON.stringify(arg))
              $scope.data = arg;
            }, function(error){
              //alert(JSON.stringify(error))
            });
          });
        },
    myEvents : function () {
      TwitterLib.myEvents(user).then(function (arg) {
        $scope.data = arg;
      }, function(error){
        //alert(JSON.stringify(error))
      });
    },
    shareEvent : function(id) {
      TwitterLib.shareEvent(id).then(function (arg) {
        
      }, function(error){
        //alert(JSON.stringify(error))
      });
    },
    favoriteEvent : function(id) {
      TwitterLib.favoriteEvent(id).then(function (arg) {
        
      }, function(error){
        //alert(JSON.stringify(error))
      });
    },
    attendingEvents : function () {
      TwitterLib.attendingEvents().then(function (arg) {
        $scope.data = arg;
      }, function(error){
        //alert(JSON.stringify(error))
      });
    },
    actionsEvents : function () {
      TwitterLib.actionsEvents(tags).then(function (arg) {
        $scope.tweets = arg.statuses;
      }, function(error){
        //alert(JSON.stringify(error))
      });
    },


  }
    eventMethods.actionsEvents();


    $scope.posts = Posts.all();
    $scope.items = [];
})