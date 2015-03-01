angular.module('downForIt.controllers')

.controller('HomeCtrl', function($scope, TwitterLib, $ionicActionSheet) {

  TwitterLib.apiGetCall({
    url: 'https://api.twitter.com/1.1/search/tweets.json',
    data: {
      q: '#down4it'
    }
  }).then(function(response){
    $scope.tweets = response.statuses;
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

.filter('tags', function(){
  return function(items, joinString){
    var results = [];
    items.forEach(function(item){
      results.push('#'+item.text);
    });
    joinString = joinString || ', ';
    return results.join(joinString);
  };
})

.directive('map', function() {
  return {
    restrict: 'EA',
    scope: {
      onCreate: '&',
      lat: '&',
      long: '&',
      zoom: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng($scope.lat(), $scope.long()),
          zoom: $scope.zoom(),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          draggable: false
        };
        var map = new google.maps.Map($element[0], mapOptions);
  
        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});