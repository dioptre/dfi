angular.module('downForIt.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    handlebar: '@bsparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    handlebar: '@mlynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    handlebar: '@ajostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    handlebar: '@ajostlin',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    handlebar: '@ajostlin',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

// .factory('Terms', function() {
//   // Might use a resource here that returns a JSON array

//   // Some fake testing data
//   var terms = 'Terms';

//   return {
//     all: function() {
//       return terms;
//     },
//   }
// })

.factory('Posts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var posts = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return posts;
    },
    get: function(postId) {
      // Simple index lookup
      return posts[postId];
    }
  }

})
// .factory('PersonService', function($http){
//   var BASE_URL = "http://api.randomuser.me/";
//   var items = [];

//   return {
//     GetFeed: function(){
//       return $http.get(BASE_URL+'?results=10').then(function(response){
//         items = response.data.results;
//         return items;
//       });
//     },
//     GetNewUser: function(){
//       return $http.get(BASE_URL).then(function(response){
//         items = response.data.results;
//         return items;
//       });
//     }
//   }
//   });

.factory('Api', function($cordovaOauth, $cordovaOauthUtility, $http, $q, $localStorage) {
    // 1
    var twitterKey = "TWITTER.KEY";
    var clientId = 'RtsdiI5bTz4GFcawWLYYRfIok';
    var clientSecret = 'Q3OhpC8wmiijHI7gA2KqS6OOYn1q9TcgcJzaaQCI5v2kDqw0yl';

    // 2
    function storeUserToken(data) {
        $localStorage[twitterKey] = data;
    }

    function getStoredToken() {
        return $localStorage[twitterKey];
    }

    // 3
    function createTwitterSignature(method, url) {
        var token = getStoredToken();
        var oauthObject = {
            oauth_consumer_key: clientId,
            oauth_nonce: $cordovaOauthUtility.createNonce(10),
            oauth_signature_method: "HMAC-SHA1",
            oauth_token: token.oauth_token,
            oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
            oauth_version: "1.0"
        };
        var signatureObj = $cordovaOauthUtility.createSignature(method, url, oauthObject, {}, clientSecret, token.oauth_token_secret);
        $http.defaults.headers.common.Authorization = signatureObj.authorization_header;
    }

    return {
        // 4
        init: function() {
            var deferred = $q.defer();
            var token = getStoredToken();

            if (!!token) {
                deferred.resolve(true);
            } else {
                $cordovaOauth.twitter(clientId, clientSecret).then(function(result) {
                    storeUserToken(result);
                    deferred.resolve(result);
                }, function(error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        },
        // 5
        isAuthenticated: function() {
            return !!getStoredToken();
        },
        // 6
        getHomeTimeline: function() {
            var home_tl_url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
            createTwitterSignature('GET', home_tl_url);
            return $http.get(home_tl_url);
        },
        logout: function() {
          storeUserToken(null);
        },
        get: function(url, options){
          url = 'https://api.twitter.com/1.1/' + url + '.json';
          createTwitterSignature('GET', url);
          return $http.get(url, options);
        },
        storeUserToken: storeUserToken,
        getStoredToken: getStoredToken,
        createTwitterSignature: createTwitterSignature
    };
});
