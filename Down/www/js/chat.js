angular.module('downForIt.controllers')

.controller('ChatsCtrl', function($scope, Chats, TwitterLib) {
  //TODO : We need to import that names and start a message and message id to start
  //a group conversation
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
});