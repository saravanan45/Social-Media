import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import HomeHeader from './HomeHeader/index';
import HomeBody from './HomeBody';
import HomeTweets from './HomeTweets';
import HomeOptions from './HomeOptions';
import HomeTweetsBody from './HomeTweetsBody';
import HomeProfile from './HomeProfile/index';
import HomeTweetsGroup from './HomeTweetsGroup';
import { getUserInfo } from '../../services/restapi';
import ClipLoader from 'react-spinners/ClipLoader';
import { Loader } from '../Common/Loader';
import HomeProfileSection from './HomeProfileSection';
import {
  uploadImage,
  saveBio,
  getAllTweets,
  addLikeToTweet,
  removeLikeFromTweet,
  deleteTweet,
  getNotificationsFromAPI
} from '../../services/restapi';
import swal from 'sweetalert';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import {
  updateUserProfileBio,
  updateUserProfileInfo,
  updateUserImageURL,
  updateAllTweets,
  incrementLikeCount,
  decrementLikeCount,
  deleteTweetFromTweets,
  setNotifications
} from './actions';
import { compose } from 'redux';
import { deriveDateDetails } from '../Common/utils/DateSplitter';
import HomeDate from './HomeDate';
import Comments from './Comments/index';

const Home = ({
  history,
  updateUserBioInStore,
  updateUserInfoInStore,
  username = '',
  userimage = '',
  userjoinedDate = '',
  userdescription = '',
  userlocation = '',
  tweets = [],
  updateUserImageInStore,
  updateTweetsInStore,
  incrementLikeCountInStore,
  decrementLikeCountInStore,
  deleteTweetFromStore,
  setNotificationsInStore
}) => {
  const [displayComments, setDisplayComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayProfile, setDisplayProfile] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    window.addEventListener('Token Expired', forceReLogin);
    getUserProfile();
    getAllNotifications();
    getTweets();
    return () => {
      window.removeEventListener('Token Expired', forceReLogin);
    };
  }, []);

  const forceReLogin = () => {
    localStorage.clear();
    history.push('/');
    swal('Sorry!', 'Your Session Expired', 'info');
  };

  const getAllNotifications = async () => {
    try {
      setLoading(true);
      const notifiers = await getNotificationsFromAPI();
      setNotificationsInStore(notifiers);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal('OOPS!', 'Unable to get the Notifications', 'error');
    }
  };

  const getUserProfile = async () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    setLoading(true);
    try {
      const userInfo = await getUserInfo(userId);
      const {
        imageURL,
        emailId,
        createdAt,
        userName,
        description = '',
        location = ''
      } = userInfo;
      const data = {
        userName,
        imageURL,
        location,
        description,
        createdAt,
        emailId,
        userId
      };
      updateUserInfoInStore(data);
      localStorage.setItem('UserProfile', JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTweets = async () => {
    try {
      setLoading(true);
      const tweets = await getAllTweets();
      updateTweetsInStore(tweets);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal('OOPS!', 'Something Wrong. Please try again', 'error');
    }
  };

  const changeDisplayProfile = () => {
    setDisplayProfile(!displayProfile);
  };

  const uploadFile = async e => {
    const userData = JSON.parse(localStorage.getItem('UserProfile'));
    try {
      setLoading(true);
      const file = e.target.files[0];
      const { imageURL } = await uploadImage(file);
      userData.imageURL = imageURL;
      localStorage.setItem('UserProfile', JSON.stringify(userData));
      updateUserImageInStore(imageURL);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      swal('OOPS!', error, 'error');
      console.log(error);
    }
  };

  const saveBioInfo = async data => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const userProfile = JSON.parse(localStorage.getItem('UserProfile'));
    setLoading(true);
    try {
      const response = await saveBio(data, userId);
      console.log(response);
      updateUserBioInStore(data);
      setLoading(false);
      userProfile.description = data.description;
      userProfile.location = data.location;
      localStorage.setItem('UserProfile', JSON.stringify(userProfile));
      swal('Success!', 'You changes have been saved!', 'success');
      return;
    } catch (error) {
      setLoading(false);
      swal('OOPS!', error, 'error');
      console.log(error);
    }
  };

  const changeDisplayComments = (tweetId = '') => {
    if (tweetId.length) {
      setSelectedId(tweetId);
    }
    setDisplayComments(!displayComments);
  };

  const changeLike = (tweetId, bool) => {
    if (bool) {
      return removeLike(tweetId);
    }
    return addLike(tweetId);
  };

  const addLike = async tweetId => {
    try {
      setLoading(true);
      const response = await addLikeToTweet(tweetId);
      // setLike(!like);
      incrementLikeCountInStore(tweetId);
      setLoading(false);
      console.log(response);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal('OOPS!', `Action can't be completed now`, 'error');
    }
  };

  const removeLike = async tweetId => {
    try {
      setLoading(true);
      const response = await removeLikeFromTweet(tweetId);
      decrementLikeCountInStore(tweetId);
      setLoading(false);
      console.log(response);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal('OOPS!', `Action can't be completed now`, 'error');
    }
  };

  const callDeleteWarning = tweetId => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => callDeleteTweet(tweetId)
        },
        {
          label: 'No',
          onClick: () => {
            return;
          }
        }
      ]
    });
  };

  const callDeleteTweet = async tweetId => {
    try {
      setLoading(true);
      const response = await deleteTweet(tweetId);
      deleteTweetFromStore(tweetId);
      setLoading(false);
      swal('Success', 'Tweet got deleted', 'success');
      return;
    } catch (error) {
      console.log(error);
      swal('OOPS!', `Tweet can't be deleted now`, 'error');
    }
  };

  return (
    <Fragment>
      <HomeHeader changeDisplayProfile={changeDisplayProfile} />
      <HomeBody>
        <HomeProfileSection display={displayProfile ? 1 : 0}>
          <HomeProfile
            imageURL={userimage}
            userName={username}
            createdAt={userjoinedDate}
            description={userdescription}
            location={userlocation}
            saveBioInfo={saveBioInfo}
            uploadFile={uploadFile}
          />
        </HomeProfileSection>

        <HomeTweetsGroup>
          {tweets &&
            tweets.map(tweet => (
              <HomeTweets>
                <div>
                  <img src={tweet.imageURL}></img>
                </div>
                <HomeTweetsBody>
                  {tweet.userName == username ? (
                    <i
                      class="fa fa-trash-o"
                      style={{
                        'font-size': '24px',
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        color: 'mediumblue'
                      }}
                      onClick={() => {
                        callDeleteWarning(tweet.tweetId);
                      }}
                    ></i>
                  ) : null}
                  <title>{tweet.userName}</title>
                  <label>{tweet.message}</label>
                  <HomeOptions>
                    <label
                      onClick={() => {
                        changeLike(
                          tweet.tweetId,
                          tweet &&
                            tweet.likedBy &&
                            tweet.likedBy.includes(username)
                        );
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {tweet &&
                      tweet.likedBy &&
                      tweet.likedBy.includes(username) ? (
                        <i
                          style={{ color: 'deeppink' }}
                          className="fa fa-heart"
                        ></i>
                      ) : (
                        <i className="fa fa-heart-o"></i>
                      )}
                      <span>
                        {' '}
                        {tweet.likesCount}{' '}
                        {tweet.likesCount == 1 ? 'like' : 'likes'}
                      </span>
                    </label>
                    <label
                      onClick={() => {
                        changeDisplayComments(tweet.tweetId);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fa fa-comments-o"></i>
                      <span>
                        {' '}
                        {tweet.commentsCount}{' '}
                        {tweet.commentsCount == 1 ? 'comment' : 'comments'}
                      </span>
                    </label>
                  </HomeOptions>
                  <HomeDate>
                    {deriveDateDetails(tweet.createdAt, 'TIME')}{' '}
                    {deriveDateDetails(tweet.createdAt, 'DATE')}
                    {deriveDateDetails(tweet.createdAt, 'COMPLETOR')}{' '}
                    {deriveDateDetails(tweet.createdAt, 'MONTH')}{' '}
                    {deriveDateDetails(tweet.createdAt, 'YEAR')}
                  </HomeDate>
                </HomeTweetsBody>
              </HomeTweets>
            ))}
        </HomeTweetsGroup>
      </HomeBody>
      {displayComments ? (
        <Comments closePopUp={changeDisplayComments} tweetId={selectedId} />
      ) : null}
      <Loader loading={loading ? 1 : 0}>
        <ClipLoader size={200} color={'black'} loading={loading} />
      </Loader>
    </Fragment>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    username:
      state.HomeReducer && state.HomeReducer.userProfile
        ? state.HomeReducer.userProfile.userName
        : '',
    userimage:
      state.HomeReducer && state.HomeReducer.userProfile
        ? state.HomeReducer.userProfile.imageURL
        : '',
    userdescription:
      state.HomeReducer && state.HomeReducer.userProfile
        ? state.HomeReducer.userProfile.description
        : '',
    userlocation:
      state.HomeReducer && state.HomeReducer.userProfile
        ? state.HomeReducer.userProfile.location
        : '',
    userjoinedDate:
      state.HomeReducer && state.HomeReducer.userProfile
        ? state.HomeReducer.userProfile.createdAt
        : '',
    tweets:
      state.HomeReducer && state.HomeReducer.tweets
        ? state.HomeReducer.tweets
        : []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserBioInStore: data => dispatch(updateUserProfileBio(data)),
    updateUserInfoInStore: data => dispatch(updateUserProfileInfo(data)),
    updateUserImageInStore: data => dispatch(updateUserImageURL(data)),
    updateTweetsInStore: data => dispatch(updateAllTweets(data)),
    incrementLikeCountInStore: data => dispatch(incrementLikeCount(data)),
    decrementLikeCountInStore: data => dispatch(decrementLikeCount(data)),
    deleteTweetFromStore: data => dispatch(deleteTweetFromTweets(data)),
    setNotificationsInStore: data => dispatch(setNotifications(data))
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(Home);
