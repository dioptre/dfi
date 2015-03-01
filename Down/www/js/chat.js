angular.module('downForIt.controllers')

.controller('ChatDetailCtrl', function($scope, Chats, TwitterLib, $stateParams, $firebase, user) {

  var ref = new Firebase("https://downforit.firebaseio.com/events/"+$stateParams.chatId);

  var syncEvent = $firebase(ref).$asObject();
  syncEvent.$bindTo($scope, "event").then(function(){
    // BOUND, data exists!
    // $scope.chats = {};
    if (!$scope.event.chatroom) {
      $scope.event.chatroom = {};
    }
  });

  var syncMessages = $firebase(ref.child('chatroom').orderByChild('created_at DESC')).$asArray();
  $scope.messages = syncMessages;
  
  $scope.message = function() {
    $scope.newMessage.created_at = new Date().getTime();
    $scope.newMessage.sender = user;
    $scope.event.chatroom[new Date().getTime()] = $scope.newMessage;
    $scope.reset();
  };

  $scope.reset = function() {
    $scope.newMessage = {
      text: '',
    };
  };


  $scope.reset();

});