angular.module('downForIt.controllers')

.controller('ChatDetailCtrl', function($scope, Chats, TwitterLib, $stateParams, $firebase) {
  var ref = new Firebase("https://downforit.firebaseio.com/events");
  // create an AngularFire reference to the data
  var sync = $firebase(ref.child($stateParams.chatId));
  // download the data into a local object
  var syncObject = sync.$asObject();

  syncObject.$bindTo($scope, "event").then(function(){
    // BOUND, data exists!
    // $scope.chats = {};
    if (!$scope.event.chatroom) {
      $scope.event.chatroom = {};
    }
  });

  var options = {
    url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
    data: {
      'screen_name': "aaronksaunders",
      'count': "25"
    }
  };
  
  $scope.message = function() {
    $scope.newMessage.created_at = new Date().getTime();
    $scope.event.chatroom[new Date().getTime()] = $scope.newMessage;
    $scope.reset();
  };

  $scope.reset = function() {
    $scope.newMessage = {
      text: '',
      sender: '@proloser'
    };
  };


  $scope.reset();

});