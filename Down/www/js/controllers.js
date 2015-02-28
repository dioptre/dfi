angular.module('downForIt.controllers', [])

.controller('HomeCtrl', function($scope, Chats, $ionicActionSheet, Api) {
  $scope.chats = Chats.all();


  Api.get('tweets', { params: { q: '#test'}}).then(function(response){
    $scope.tweets = response;
  }, function(error){
    $scope.error = error;
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

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
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

.controller('PostsCtrl', function($scope, Posts) {
  $scope.posts = Posts.all();
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

})

.controller('LoginCtrl', function($scope, Api, $state){

  $scope.login = function(){
    Api.init().then(function(response){
      $scope.error = response;
      $state.go('tab');
    }, function(error){
      $scope.error = error;
      console.log(error);
    });
  };

})

// .controller('MyCtrl', function($scope, $timeout, PersonService) {
//   $scope.items = [];

//   PersonService.GetFeed().then(function(items){
//     $scope.items = items;
//   });
// });
