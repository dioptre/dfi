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

.factory('Posts', function(TwitterLib) {
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

  //#camping @ #yosemite! Who's #down4it? #5ppl #12pm #y2015m03d01
  var post = {
    lat: 37.7821120598956,
    long: -122.400612831116,
    tags: ['rock climbing'],
    tag: 'rock climbing',
    starts: new Date(),
    // place_id: 'yosemite',
    ppl: 5
  }

  return {
    all: function() {
      return posts;
    },
    get: function(postId) {
      // Simple index lookup
      return posts[postId];
    },
    update: function(postDetails) {
      //postDetails = post;
      //postDetails.status = "#camping @ #yosemite! Who's #down4it? #5ppl #12pm #y2015m03d01";
      
      if (postDetails.tag && postDetails.tag.length && postDetails.tag.length > 0)
        postDetails.status = '#' + postDetails.tag.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).replace(/\W+/g, "");
      else
        postDetails.status = '#hangOut';

      if (postDetails.place && postDetails.place.length && postDetails.place.length > 0)
        postDetails.status += ' @ #' + postDetails.place.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).replace(/\W+/g, "");

      postDetails.status += "! Who's #downforit?";

      if (postDetails.ppl && postDetails.ppl > 0)
        postDetails.status += " #" + postDetails.ppl + "ppl";

      var startTime = new Date();
      var startMeridian= 'pm';
      if (postDetails.starts)
        startTime = postDetails.starts;
      else 
        postDetails.status += " #now";
      var starts = startTime.getHours();
      if (starts < 12 || starts == 24)
        startMeridian = 'am';
      starts = starts % 12;
      if (starts === 0)
        starts  = 12;

      postDetails.status += " #" + starts + startMeridian;

      postDetails.status += " #y" + startTime.getFullYear() + "m" + startTime.getMonth() + 1 + "d" + startTime.getDate(); 

      var tweet = {
          'status': postDetails.status,
          'lat': postDetails.lat,
          'long': postDetails.long,
          'place_id': postDetails.place_id
      };

      alert(JSON.stringify(tweet));
      TwitterLib.tweet(tweet).then(function (_data) {
        alert("tweet success" + JSON.stringify(_data));
      }, function (_error) {
        alert("tweet error" + JSON.stringify(_error));
      })
    }
  }

})
