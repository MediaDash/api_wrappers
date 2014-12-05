module.exports = function () {

  var getText = function(instagramObject) {
    if("caption" in instagramObject) {
      if(instagramObject.caption && "text" in instagramObject.caption) {
        return instagramObject.caption.text;
      }
    }
  };

  var parseInstaObject = function(instagramObject) {
    var instaObject = {
      instagramId: instagramObject.id,
      username: instagramObject.user.username,
      userProfilePic: instagramObject.user.profile_picture,
      text: getText(instagramObject),
      location: instagramObject.location,
      timestamp: instagramObject.created_time,
      hashtags: instagramObject.tags,
      image: instagramObject.images.standard_resolution.url,
      likes: instagramObject.likes.count,
      filter: instagramObject.filter,
      url: instagramObject.url
    };
    return instaObject;
  };

  return {
    parseInstaObjects: function(instagramObjects) {
      var instas = [];
      for ( var i = 0; i < instagramObjects.length; i++ ) {
        instas.push( parseInstaObject( instagramObjects[i] ) );
      }
      return instas;
    },

    minTimestamp: function(instagramObjects) {
      var minTimestamp = Date.now();
      for ( var i = 0; i < instagramObjects.length; i++ ) {
        var timestamp = parseInstaObject( instagramObjects[i] ).timestamp;
        if (minTimestamp > timestamp){
          minTimestamp = timestamp;
        }
      }
      console.log(minTimestamp);
      return minTimestamp
    },

    parseInstaObjectsBeforeTime: function(instagramObjects, timestamp) {
      var instaObject;
      var instas = [];
      if ( instagramObjects && instagramObjects.length) {
        for ( var i = 0; i < instagramObjects.length; i++ ) {
          instaObject = parseInstaObject( instagramObjects[i] );
          if (instaObject.timestamp > timestamp) {
            instas.push( instaObject );
          }
        }
      }
      return instas;
    }
  };
};
