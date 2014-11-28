module.exports = function() {

  var parseHashtags = function(hashtags) {
    var hashtagsArray = [];
    for( var i = 0; i < hashtags.length; i++ ) {
      hashtagsArray.push( hashtags[i].text );
    }
    return hashtagsArray;
  };

  var parseTweet = function(tweetData) {
    var tweet = {
      id: tweetData.id,
      username: tweetData.user.screen_name,
      profile_picture: tweetData.user.profile_image_url,
      description: tweetData.text,
      hashtags: parseHashtags(tweetData.entities.hashtags),
      location: tweetData.geo,
      timestamp: tweetData.created_at,
      likes: tweetData.favorite_count,
      reshares: tweetData.retweet_count
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
  }
}
