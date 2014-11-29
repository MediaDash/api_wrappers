module.exports = function() {

  var parseHashtags = function(hashtags) {
    var hashtagsArray = [];
    for( var i = 0; i < hashtags.length; i++ ) {
      hashtagsArray.push( hashtags[i].text );
    }
    return hashtagsArray;
  };

  var parseMedia = function( entites ) {
    if ( "media" in person ) {
      return entites.media[0].media_url;
    }
  };

  var parseTweet = function(tweetData) {
    var tweet = {
      tweetId: tweetData.id,
      username: tweetData.user.screen_name,
      userProfilePic: tweetData.user.profile_image_url,
      text: tweetData.text,
      location: tweetData.geo,
      timestamp: tweetData.created_at,
      hashtags: parseHashtags( tweetData.entities.hashtags ),
      image: parseMedia( tweetData.entities ),
      likes: tweetData.favorite_count,
      reshares: tweetData.retweet_count,
      url: 'https://twitter.com/' + tweetData.user.screen_name + '/status/' + tweetData.id_str
    };
    return tweet;
  };

  return {
    parseTweets: function(tweetsData) {
      var tweets = [];
      for( var i = 0; i < tweetsData.statuses.length; i++ ) {
        tweets.push(parseTweet(tweetsData.statuses[i]));
      }
      return tweets;
    }
  };
};
