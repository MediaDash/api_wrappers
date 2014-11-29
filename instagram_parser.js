module.exports = function () {

  var parseInstaUserName = function(username) {
    var userNameArray = [];
    for( var i=0; i < username.length; i++) {
      userNameArray.push(username[i].text)
    }
    return userNameArray;
  };

  var parseInstaObject = function(instagramObject) {
    var instaObject = {
      tags: instagramObject.tags,
      username: instagramObject.user.username,
      images: instagramObject.images.standard_resolution.url,
      userProfilePic: instagramObject.user.profile_picture,
      createdAt: instagramObject.created_time,
      instaLocation: instagramObject.location
    }
    return instaObject;
  };

  return {
    parseInstaObjects: function(instagramObject) {
      var insta = [];
      for ( var i = 0; i < instagramObject.length; i++) {
        insta.push(parseInstaObject(instagramObject[i]));
      }
      return insta;
    }
  }
}
