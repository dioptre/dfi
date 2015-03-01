angular.module('downForIt.controllers')

.controller('HomeCtrl', function($scope, TwitterLib, $state, $stateParams, $firebase, user, $http) {

  $scope.tag = $stateParams.tag;

  if ($scope.tag) {
    $http.get('https://api.flickr.com/services/rest/?per_page=1&format=json&sort=random&method=flickr.photos.search&tags='+$scope.tag+'&api_key=5f90db6f11e587d8be3a1924c31ebe67&nojsoncallback=1').then(function(response){
      $scope.banner = response.data.photos.photo[0];
    });
  }

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
            text: 'downforit'
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



  var ref = new Firebase("https://downforit.firebaseio.com/users/"+user.id);

  var syncUser = $firebase(ref).$asObject();
  syncUser.$bindTo($scope, "user").then(function(){
    // BOUND, data exists!
    if ($scope.user.tags && $scope.user.tags[$scope.tag])
      $scope.followed = true;
  });

  var query = ['#down4it','#downforit'];

  if ($stateParams.tag)
    query = query.join(' #' + $stateParams.tag+' OR ');
  else
    query = query.join(' OR ');

  query += ' -#plusone';

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

  $scope.toggleFollow = function() {
    if (!$scope.user.tags)
      $scope.user.tags = {};
    if (!$scope.user.tags[$scope.tag]) {
      $scope.followed = $scope.user.tags[$scope.tag] = true;
    } else {
      delete $scope.user.tags[$scope.tag];
      $scope.followed = false;
    }

  };

})

.filter('tags', function(){
  return function(items){
    var results = [];
    items.forEach(function(item){
      if (!_.contains(['downforit', 'down4it', 'Mar2', 'mar1', 'Feb1', '1am', '2am', '5am', '3am', 'Mar1', '10am', 'MounTamalpais', 'Mar2Invalid','Mar1', '4am', '12pm', 'FortMason', 'Ganado', 'MarinCounty', '3pm', 'CoitTower'], item.text))
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