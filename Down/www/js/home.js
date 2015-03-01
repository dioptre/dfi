angular.module('downForIt.controllers')

.controller('HomeCtrl', function($scope, TwitterLib, $state, $stateParams) {

  $scope.tag = $stateParams.tag;

  $scope.tweets = [
    {
      id: 571882561464508400,
      'created_at': 'Sun Mar 01 02:26:30 +0000 2015',
      'text': '#down4it #hacking @ #fortmason with #launch',
      user: {
        screen_name: 'ProLoser_Dean',
        entities: {
          profile_image_url: 'http://pbs.twimg.com/profile_images/525393982239432704/qV5ky-kB_normal.jpeg'
        }
      },
      entities: {
        hashtags: [
          {
            text: 'down4it'
          },
          { 
            text: 'hacking'
          },
          {
            text: 'fortmason'
          }
        ],
      },
      coordinates: {
        coordinates: [
          -122.43,
          37.8
        ]
      },
      place: {
        name: 'San Francisco',
        full_name: 'San Francisco, CA'
      }
    }
  ];

  var query = '#down4it';

  if ($stateParams.tag)
    query += ' #' + $stateParams.tag;

  $scope.refresh = function() {
    TwitterLib.apiGetCall({
      url: 'https://api.twitter.com/1.1/search/tweets.json',
      data: {
        q: query
      }
    }).then(function(response){
      $scope.tweets = response.statuses;
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.refresh();

})

.filter('tags', function(){
  return function(items){
    var results = [];
    items.forEach(function(item){
      if (item.text != 'down4it')
        results.push(item.text);
    });
    return results;
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