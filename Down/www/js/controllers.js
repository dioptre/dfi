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
    newEvent: true
  };

})

.controller('PostsCtrl', function($scope, Posts, user, TwitterLib) {
  alert('asdas');
    TwitterLib.myEvents(user).then(function (arg) {
      $scope.data = arg;
    })
    $scope.posts = Posts.all();
    $scope.items = [];
})