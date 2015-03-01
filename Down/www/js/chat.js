angular.module('downForIt.controllers')

.controller('ChatDetailCtrl', function($scope, Chats, TwitterLib, $stateParams, $firebase, user) {

  var ref = new Firebase("https://downforit.firebaseio.com/");
  var eventRef = ref.child('events/'+$stateParams.chatId);
  var userRef = ref.child('users/'+user.id);

  var syncEvent = $firebase(eventRef).$asObject();
  syncEvent.$bindTo($scope, "event").then(function(){
    // BOUND, data exists!
    // $scope.chats = {};
  });

  var syncMessages = $firebase(eventRef.child('chatroom').orderByChild('created_at DESC')).$asArray();
  $scope.messages = syncMessages;

  var syncUser = $firebase(userRef).$asObject();
  syncUser.$bindTo($scope, "user").then(function(){
    // BOUND, data exists!
    if ($scope.user.joined && $scope.user.joined[$scope.tag])
      $scope.joined = true;
  });
  
  $scope.message = function() {

    if (!$scope.event.chatroom) {
      $scope.event.chatroom = {};
    }
    $scope.newMessage.created_at = new Date().getTime();
    $scope.newMessage.sender = user;
    $scope.event.chatroom[new Date().getTime()] = $scope.newMessage;
    $scope.join();
    $scope.reset();
  };

  $scope.join = function() {
    if (!$scope.event.members) {
      $scope.event.members = {};
    }
    $scope.event.members[user.id] = true;
    if (!$scope.user.joined)
      $scope.user.joined = {};
    $scope.user.joined[$scope.event.id] = true;
  };

  $scope.leave = function() {
    if (!$scope.event.members) {
      $scope.event.members = {};
    } else {
      delete $scope.event.members[user.id];
    }
    if (!$scope.user.joined)
      $scope.user.joined = {};
    else
      delete $scope.user.joined[$scope.event.id];
  };

  $scope.reset = function() {
    $scope.newMessage = {
      text: '',
    };
  };


  $scope.reset();

})

.filter('ngdate', function(){
  return function(input){

    if (!input) return;
    var j = new Date(input);
    return j.getTime();
  };
})

.filter('count', function(){
  return function(collection) {
    if (!collection) return;
    return Object.keys(collection).length;
  };
});