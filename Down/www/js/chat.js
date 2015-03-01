angular.module('downForIt.controllers')

.controller('ChatDetailCtrl', function($scope, Chats, TwitterLib, $stateParams, $firebase, user, utils, event) {

  var ref = new Firebase("https://downforit.firebaseio.com/");
  var eventRef = ref.child('events/'+$stateParams.chatId);
  var userRef = ref.child('users/'+user.id);

  $scope.tweet = event;

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
    if (!$scope.user.joined[$stateParams.chatId]) {
      $scope.user.joined[$stateParams.chatId] = true;
      TwitterLib.goingEvent($stateParams.chatId);
    }
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
      delete $scope.user.joined[$stateParams.chatId];
  };

  $scope.calendar = function() {
    utils.addToCalendar(event).then(function(res){
      // alert('SUCCESS ' + JSON.stringify(res))
    },function(res){
      // alert('ERROR ' + JSON.stringify(res))
    });
  };

  $scope.reset = function() {
    $scope.newMessage = {
      text: '',
    };
  };


  $scope.reset();

})

.factory('utils', function($q){

  return {
    getTime: function(tweet){
      time = moment();
      tweet.entities.hashtags.forEach(function(tag){
        switch (tag.text) {
          case '1am':
          case '2am':
          case '3am':
          case '4am':
          case '5am':
          case '6am':
          case '7am':
          case '8am':
          case '9am':
          case '10am':
          case '11am':
            time.hour(tag.text.substr(0, tag.text.length - 2)-1).minutes(0).seconds(0);
            break;
          case '1pm':
          case '2pm':
          case '3pm':
          case '4pm':
          case '5pm':
          case '6pm':
          case '7pm':
          case '8pm':
          case '9pm':
          case '10pm':
          case '11pm':
            time.hour(tag.text.substr(0, tag.text.length - 2)+11).minutes(0).seconds(0);
            break;
          case '12am':
            time.hour(0).minutes(0).seconds(0);
            break;
          case '12pm':
            time.hour(11).minutes(0).seconds(0);
            break;
        }

        switch (tag.text.substr(0,3).toLowerCase()) {
          case 'jan':
          case 'feb':
          case 'mar':
          case 'apr':
          case 'may':
          case 'jun':
          case 'jul':
          case 'aug':
          case 'sep':
          case 'oct':
          case 'nov':
          case 'dec':
            time.month(tag.text.substr(0,3).toLowerCase());
            time.date(tag.text.substr(3));
        }

      });

      return time;
    },
    addToCalendar: function(tweet) {
      if (!window.cordova) return alert('Must be on mobile');
      if (!window.cordova.plugins.CalendarPlugin) return alert('RUN: cordova plugin add fr.smile.cordova.calendar');

      var deferred = $q.defer();
      cordova.plugins.CalendarPlugin.createEvent(
          tweet.text,
          tweet.location,
          '',
          this.getTime(tweet) || 0, // Start date as a timestamp in ms
          endTime || 0, // End date as a timestamp in ms
          !!allDay, // Whether it is an all day event or not,
          function(res){ // function called on success
            deferred.resolve(res);
          },
          function(res){ // function called on error
            deferred.reject(res);
          }
      );
      return deferred.promise;
    }
  };
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