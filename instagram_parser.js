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
<<<<<<< HEAD
        insta.push(parseInstaObject(instagramObject[i]));
=======
        insta.push(parseInstaObject(instagramObject.attribution));
>>>>>>> 34af5492c7df378e5741f780c0aa7d7e3a6d7416
      }
      return insta;
    }
  }
}
