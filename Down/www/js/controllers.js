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
    TwitterLib.tweet({status : $scope.message.text}).then(function (_data) {
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

.controller('PostsCtrl', function($scope, $ionicModal, Posts, $cordovaGeolocation) {

    $scope.posts = Posts.all();
    $scope.items = [];
    // Initialize the dialog window
    $ionicModal.fromTemplateUrl('templates/create-events.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $cordovaGeolocation.getCurrentPosition().then(function(position){
        $scope.position = position;
      });
      $scope.modal = modal;
    }); 

    $scope.showTaskPrompt = function() {
      var newTask = {
        title: '',
        description: '',
        isComplete: null
      };  

      $scope.newTask = newTask;
      $scope.modal.show();
    };

    $scope.saveTask = function() {
      $scope.items.push($scope.newTask);
    };

    $scope.cancelTask = function() {
      $scope.modal.hide();
    };

    $scope.completeItem = function(item) {
      $scope.removeItem(item);
    };

    $scope.ignoreItem = function(item) {
      $scope.removeItem(item);
    };

    $scope.removeItem = function(item) {
      var i = -1;
      angular.forEach($scope.items, function(task, key) {
        if (item === task) {
          i = key;
        }
        });   

      if (i >= 0) {
        $scope.items.splice(i, 1);
        $localForage.setItem('__TASKS__', $scope.items);
        return true;
      }
      return false;
    };
})