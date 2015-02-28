angular.module('downForIt.controllers', [])

.controller('HomeCtrl', function($scope, Chats, $ionicActionSheet) {
  $scope.chats = Chats.all();

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

.controller('ChatsCtrl', function($scope, Chats, $cordovaOauth) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  window.cauth = $cordovaOauth;
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

.controller('PostsCtrl', function($scope, Posts) {
  $scope.posts = Posts.all();
})

.controller('AccountCtrl', function($scope, $cordovaOauth) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.login = function(){
    $cordovaOauth.twitter('RtsdiI5bTz4GFcawWLYYRfIok', 'Q3OhpC8wmiijHI7gA2KqS6OOYn1q9TcgcJzaaQCI5v2kDqw0yl').then(function(response){
      var axs = response.access_token;
      $scope.response = response;
      console.log(response);
    }, function(error){
      console.log(error);
      $scope.response = error;
    });
  };

})

// .controller('MyCtrl', function($scope, $timeout, PersonService) {
//   $scope.items = [];

//   PersonService.GetFeed().then(function(items){
//     $scope.items = items;
//   });
// });
