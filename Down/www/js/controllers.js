angular.module('downForIt.controllers', [])

.controller('HomeCtrl', function($scope, TwitterLib, $ionicActionSheet) {

  TwitterLib.apiGetCall({
    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
    data: {
      q: '#down4it'
    }
  }).then(function(response){
    $scope.tweets = response;
  });

  // Triggered on a button click, or some other target
  $scope.menu = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<i class="icon ion-heart"></i> Subscribe to tag' },
       { text: '<i class="icon ion-share"></i> Share this' },
       { text: '<i class="icon ion-volume-mute"></i> Mute this type' }
     ],
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       return true;
     }
   });

  };
})

.controller('ChatsCtrl', function($scope, Chats, TwitterLib) {
  $scope.chats = Chats.all();
  $scope.message = {
    text: ''
  };
  var options = {
    url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
    data: {
      'screen_name': "aaronksaunders",
      'count': "25"
    }
  };
  TwitterLib.apiGetCall(options).then(function (_data) {
    // alert("doStatus success");
    $scope.items = _data;
  }, function (_error) {
    alert("doStatus error" + JSON.stringify(_error));
  });

  $scope.tweet = function() {
    TwitterLib.tweet({status:$scope.message.text}).then(function (_data) {
      alert("tweet success" + JSON.stringify(_data));
    }, function (_error) {
      alert("tweet error" + JSON.stringify(_error));
    });
  };

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

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
    newEvent: true
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

    if (!~message.status.toLowerCase().indexOf('#down4it')) {
      message.status = '#down4it ' + message.status;
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

.controller('PostsCtrl', function($scope, Posts) {

    $scope.posts = Posts.all();
    $scope.items = [];
})