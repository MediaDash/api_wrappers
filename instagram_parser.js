module.exports = function () {

  var parseInstaObject = function(instagramObject) {
    var instaObject = {
      instagramId: instagramObject.id,
      username: instagramObject.user.username,
      userProfilePic: instagramObject.user.profile_picture,
      text: instagramObject.caption.text,
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
    }
  };
};
