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
    directMessage: true,
    discover: true,
    newEvent: true
  };

})

// .controller('TermsCtrl', function($scope, Terms) {
//   $scope.terms = Terms.all();

// })

.controller('LoginCtrl', function($scope, $state){

  $scope.login = function(){
    // auth().then -> $state.go('tab.home')
  };

  $scope.logout = function(){
    // auth.logout()
  };

})

.controller('LogoutCtrl', function($scope, Api, $state){

  // auth.logout()
  $state.go('login');

})

// .controller('MyCtrl', function($scope, $timeout, PersonService) {
//   $scope.items = [];

//   PersonService.GetFeed().then(function(items){
//     $scope.items = items;
//   });
// });
