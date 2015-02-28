angular.module('downForIt.controllers', [])

.controller('HomeCtrl', function($scope, Chats, $ionicActionSheet, Api) {
  $scope.chats = Chats.all();


  Api.get('search/tweets').then(function(response){
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
    directMessage: true,
    discover: true,
    newEvent: true
  };

})

// .controller('TermsCtrl', function($scope, Terms) {
//   $scope.terms = Terms.all();

// })

.controller('LoginCtrl', function($scope, Api, $state){

  $scope.login = function(){
    Api.init().then(function(response){
      $scope.error = response;
      $state.go('tab.home');
    }, function(error){
      $scope.error = error;
      console.log(error);
    });
  };

  $scope.logout = function(){
    Api.logout();
  };

})

.controller('LogoutCtrl', function($scope, Api, $state){

  Api.logout();
  $state.go('login');

})

.controller('CreateCtrl', function($scope, $ionicModal, $localForage) {
    $scope.items = [];
    $localForage.getItem('__TASKS__').then(function(tasks) {
      if (tasks) {
        $scope.items = tasks;
      }
    });
    
    // Initialize the dialog window
    $ionicModal.fromTemplateUrl('create-events.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
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
      $localForage.setItem('__TASKS__', $scope.items).then(function() {
        $scope.modal.hide();
      });
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
// .controller('MyCtrl', function($scope, $timeout, PersonService) {
//   $scope.items = [];

//   PersonService.GetFeed().then(function(items){
//     $scope.items = items;
//   });
// });
