// Ionic downForIt App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'downForIt' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'downForIt.services' is found in services.js
// 'downForIt.controllers' is found in controllers.js
angular.module('downForIt', [
  'ionic', 'downForIt.controllers', 'downForIt.services','ngCordova.plugins.geolocation',
  'ion-google-place', 'firebase'
])

.run(function($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)s
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeError', function(){
    console.error(arguments);
    $state.go('login');
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $ionicConfigProvider.views.maxCache(5);

  // setup an abstract state for the tabs directive
$stateProvider
  .state('tab', {
    url: "/tab",
    abstract: true,
    resolve:{
      user: function(TwitterLib){
        // @TODO: Uncomment for emulator

        if (window.cordova)
          return TwitterLib.apiGetCall({
            url: 'https://api.twitter.com/1.1/account/verify_credentials.json'
          });
        return {
          "contributors_enabled": true,
          "created_at": "Sat May 09 17:58:22 +0000 2009",
          "default_profile": false,
          "default_profile_image": false,
          "description": "I taught your phone that thing you like.  The Mobile Partner Engineer @Twitter. ",
          "favourites_count": 588,
          "follow_request_sent": null,
          "followers_count": 10625,
          "following": null,
          "friends_count": 1181,
          "geo_enabled": true,
          "id": 38895958,
          "id_str": "38895958",
          "is_translator": false,
          "lang": "en",
          "listed_count": 190,
          "location": "San Francisco",
          "name": "Sean Cook",
          "notifications": null,
          "profile_background_color": "1A1B1F",
          "profile_background_image_url": "http://a0.twimg.com/profile_background_images/495742332/purty_wood.png",
          "profile_background_image_url_https": "https://si0.twimg.com/profile_background_images/495742332/purty_wood.png",
          "profile_background_tile": true,
          "profile_image_url": "http://a0.twimg.com/profile_images/1751506047/dead_sexy_normal.JPG",
          "profile_image_url_https": "https://si0.twimg.com/profile_images/1751506047/dead_sexy_normal.JPG",
          "profile_link_color": "2FC2EF",
          "profile_sidebar_border_color": "181A1E",
          "profile_sidebar_fill_color": "252429",
          "profile_text_color": "666666",
          "profile_use_background_image": true,
          "protected": false,
          "screen_name": "theSeanCook",
          "show_all_inline_media": true,
          "status": {
              "contributors": null,
              "coordinates": {
                  "coordinates": [
                      -122.45037293,
                      37.76484123
                  ],
                  "type": "Point"
              },
              "created_at": "Tue Aug 28 05:44:24 +0000 2012",
              "favorited": false,
              "geo": {
                  "coordinates": [
                      37.76484123,
                      -122.45037293
                  ],
                  "type": "Point"
              },
              "id": 240323931419062272,
              "id_str": "240323931419062272",
              "in_reply_to_screen_name": "messl",
              "in_reply_to_status_id": 240316959173009410,
              "in_reply_to_status_id_str": "240316959173009410",
              "in_reply_to_user_id": 18707866,
              "in_reply_to_user_id_str": "18707866",
              "place": {
                  "attributes": {},
                  "bounding_box": {
                      "coordinates": [
                          [
                              [
                                  -122.45778216,
                                  37.75932999
                              ],
                              [
                                  -122.44248216,
                                  37.75932999
                              ],
                              [
                                  -122.44248216,
                                  37.76752899
                              ],
                              [
                                  -122.45778216,
                                  37.76752899
                              ]
                          ]
                      ],
                      "type": "Polygon"
                  },
                  "country": "United States",
                  "country_code": "US",
                  "full_name": "Ashbury Heights, San Francisco",
                  "id": "866269c983527d5a",
                  "name": "Ashbury Heights",
                  "place_type": "neighborhood",
                  "url": "http://api.twitter.com/1/geo/id/866269c983527d5a.json"
              },
              "retweet_count": 0,
              "retweeted": false,
              "source": "<a>Twitter for  iPhone</a>",
              "text": "@messl congrats! So happy for all 3 of you.",
              "truncated": false
          },
          "statuses_count": 2609,
          "time_zone": "Pacific Time (US & Canada)",
          "url": null,
          "utc_offset": -28800,
          "verified": false
        };
      }
    },
    // parent: 'authenticated',
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  
  .state('tab.chat-detail', {
    url: '/chats/:chatId',
    views: {
      'tab-chats': {
        templateUrl: 'templates/messaging.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })


  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

    .state('tab.posts', {
      url: '/posts',
      views: {
        'tab-posts': {
          templateUrl: 'templates/tab-posts.html',
          controller: 'PostsCtrl'
        }
      }
    })


    .state('tab.create', {
      url: '/create',
      views: {
        'tab-posts': {
          templateUrl: 'templates/create-event.html',
          controller: 'CreateEventCtrl'
        }
      }
    })

  // .state('tab.create', {
  //   url: '/create',
  //   views: {
  //     'tab-posts': {
  //       templateUrl: 'templates/create-event.html',
  //       controller: ''
  //     }
  //   }
  // })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.terms', {
    url: '/account/terms',
    views: {
      'tab-account': {
        templateUrl: 'templates/terms-and-agreements.html'
      }
    }
  })

  .state('tab.privacy', {
    url: '/account/privacy',
    views: {
      'tab-account': {
        templateUrl: 'templates/privacy.html'
      }
    }
  })

  .state('authenticated', {
    abstract: true,
    template: '<ui-view />',
    resolve: {
      user: function(TwitterLib, $q) {
        return TwitterLib.verify();
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })


  .state('logout', {
    url: '/logout',
    controller: 'LogoutCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
