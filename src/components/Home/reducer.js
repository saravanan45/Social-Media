const initialState = {
  userProfile: {
    userName: '',
    description: '',
    location: '',
    createdAt: '',
    location: '',
    imageURL: '',
    emailId: '',
    userId: ''
  },
  tweets: [],
  tweetWithComments: {},
  notifications: []
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATEBIO':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          description: action.payload.description,
          location: action.payload.location
        }
      };
    case 'UPDATEINFO':
      return {
        ...state,
        userProfile: action.payload
      };

    case 'UPDATEIMAGEURL':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          imageURL: action.imageURL
        },
        tweets: state.tweets.map(tweet => {
          if (tweet.userId == state.userProfile.userId) {
            tweet.imageURL = action.imageURL;
          }
          return tweet;
        })
      };
    case 'UPDATETWEETS':
      return {
        ...state,
        tweets: action.tweets
      };
    case 'UPDATENEWTWEET':
      return {
        ...state,
        tweets: [action.tweet, ...state.tweets]
      };
    case 'INCREMENTLIKES':
      return {
        ...state,
        tweets: state.tweets.map(tweet => {
          if (tweet.tweetId == action.tweetId) {
            tweet.likesCount++;
            tweet.likedBy.push(state.userProfile.userName);
          }
          return tweet;
        })
      };
    case 'DECREMENTLIKES':
      return {
        ...state,
        tweets: state.tweets.map(tweet => {
          if (tweet.tweetId == action.tweetId) {
            tweet.likesCount--;
            tweet.likedBy = tweet.likedBy.filter(
              tweet => tweet !== state.userProfile.userName
            );
          }
          return tweet;
        })
      };
    case 'UPDATETWEETWITHCOMMENTS':
      return {
        ...state,
        tweetWithComments: { ...action.data }
      };

    case 'ADDLIKETOTWEETWITHCOMMENTS':
      return {
        ...state,
        tweetWithComments: {
          ...state.tweetWithComments,
          tweetDetails: {
            ...state.tweetWithComments.tweetDetails,
            likesCount: state.tweetWithComments.tweetDetails.likesCount + 1,
            likedBy: [
              ...state.tweetWithComments.tweetDetails.likedBy,
              state.userProfile.userName
            ]
          }
        }
      };
    case 'REMOVELIKEFROMTWEETWITHCOMMENTS':
      return {
        ...state,
        tweetWithComments: {
          ...state.tweetWithComments,
          tweetDetails: {
            ...state.tweetWithComments.tweetDetails,
            likesCount: state.tweetWithComments.tweetDetails.likesCount - 1,
            likedBy: state.tweetWithComments.tweetDetails.likedBy.filter(
              user => user !== state.userProfile.userName
            )
          }
        }
      };
    case 'ADDCOMMENTTOTWEETWITHCOMMENTS':
      return {
        ...state,
        tweetWithComments: {
          ...state.tweetWithComments,
          tweetDetails: {
            ...state.tweetWithComments.tweetDetails,
            commentsCount:
              state.tweetWithComments.tweetDetails.commentsCount + 1
          },
          comments: [action.data, ...state.tweetWithComments.comments]
        }
      };

    case 'UPDATETWEETSFORNEWCOMMENT':
      return {
        ...state,
        tweets: state.tweets.map(tweet => {
          if (tweet.tweetId === action.tweetId) {
            tweet.commentsCount = tweet.commentsCount + 1;
          }
          return tweet;
        })
      };

    case 'DELETETWEETFROMTWEETS':
      return {
        ...state,
        tweets: state.tweets.filter(tweet => tweet.tweetId !== action.tweetId)
      };

    case 'SETNOTIFICATIONS':
      return {
        ...state,
        notifications: action.notifications
      };

    case 'UPDATENOTIFICATIONS':
      return {
        ...state,
        notifications: state.notifications.map(notify => {
          if (action.notificationIds.includes(notify.id)) {
            notify.read = true;
          }
          return notify;
        })
      };

    case 'CLEARREDUXSTORE':
      return initialState;
    default:
      return state;
  }
};

export default HomeReducer;
