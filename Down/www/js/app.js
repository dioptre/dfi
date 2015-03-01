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
        return TwitterLib.apiGetCall({
          url: 'https://api.twitter.com/1.1/account/verify_credentials.json'
        })
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
