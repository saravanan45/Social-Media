export const updateUserProfileBio = data => ({
  type: 'UPDATEBIO',
  payload: data
});

export const updateUserProfileInfo = data => ({
  type: 'UPDATEINFO',
  payload: data
});

export const updateUserImageURL = imageURL => ({
  type: 'UPDATEIMAGEURL',
  imageURL
});

export const updateAllTweets = tweets => ({
  type: 'UPDATETWEETS',
  tweets
});

export const updateNewTweet = tweet => ({
  type: 'UPDATENEWTWEET',
  tweet
});

export const incrementLikeCount = tweetId => ({
  type: 'INCREMENTLIKES',
  tweetId
});

export const decrementLikeCount = tweetId => ({
  type: 'DECREMENTLIKES',
  tweetId
});

export const updateTweetWithComment = data => ({
  type: 'UPDATETWEETWITHCOMMENTS',
  data
});

export const updateTweetsForNewComment = tweetId => ({
  type: 'UPDATETWEETSFORNEWCOMMENT',
  tweetId
});

export const addLikeToTweetWithComment = () => ({
  type: 'ADDLIKETOTWEETWITHCOMMENTS'
});

export const removeLikeFromTweetWithComment = () => ({
  type: 'REMOVELIKEFROMTWEETWITHCOMMENTS'
});

export const addCommentToTweetWithComment = data => ({
  type: 'ADDCOMMENTTOTWEETWITHCOMMENTS',
  data
});

export const deleteTweetFromTweets = tweetId => ({
  type: 'DELETETWEETFROMTWEETS',
  tweetId
});

export const setNotifications = notifications => ({
  type: 'SETNOTIFICATIONS',
  notifications
});

export const markNotificationsasRead = notificationIds => ({
  type: 'UPDATENOTIFICATIONS',
  notificationIds
});

export const clearReduxStorage = () => ({
  type: 'CLEARREDUXSTORE'
});
