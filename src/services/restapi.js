import React from 'react';
import swal from 'sweetalert';

export const Registration = async data => {
  try {
    const result = await fetch(
      'https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/signUp',
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data)
      }
    );
    const response = await result.json();
    if (result.status === 201) {
      return response;
    }
    if (response.error == 'email already in use') {
      throw new Error('Email Already in use');
    }
    throw new Error(response);
  } catch (error) {
    throw error;
    // console.log(error);
  }
};

export const login = async data => {
  try {
    const response = await fetch(
      'https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/login',
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      }
    );
    const result = await response.json();
    if (response.status == 200) {
      return result.user;
    }
    if (result.code == 'auth/user-not-found') {
      throw new Error('Email/Password is incorrect');
    }
    if (result.code == 'auth/invalid-email') {
      throw new Error('EmailId is incorrect');
    }
    throw new Error(result);
  } catch (error) {
    throw error;
  }
};

export const postUserDetails = async data => {
  try {
    const response = await fetch(
      'https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/Users',
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      }
    );
    // if (response.status !== 200) {
    //   throw new Error(error);
    // }
    let res = await response.json();
    if (res.ok) {
      return res;
    }
    throw new Error(res);
    console.log(res);
    return;
  } catch (error) {
    console.log(error);
  }
};

const checkExpiration = () => {
  const expirationTime = JSON.parse(localStorage.getItem('expirationTime'));
  if (expirationTime > Date.now()) {
    return true;
  }
  window.dispatchEvent(new CustomEvent('Token Expired'));
  swal({
    title: 'OOPS!',
    text: 'Session Expired! Please sign-in again',
    icon: 'error'
  });
  return false;
};

export const uploadImage = async fileInfo => {
  const result = checkExpiration();
  if (!result) {
    return;
  }
  const token = JSON.parse(localStorage.getItem('accessToken'));
  const formData = new FormData();
  formData.append('image', fileInfo);
  try {
    const response = await fetch(
      'https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/uploadImage',
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: formData
      }
    );
    console.log(response);
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getUserInfo = async userId => {
  try {
    const response = await fetch(
      `https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/getUserInfo/${userId}`,
      {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin'
      }
    );
    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const saveBio = async (data, userId) => {
  const result = checkExpiration();
  if (!result) {
    return;
  }
  const token = JSON.parse(localStorage.getItem('accessToken'));

  try {
    const response = await fetch(
      `https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/saveBio/${userId}`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllTweets = async () => {
  const result = checkExpiration();
  if (!result) {
    return;
  }
  const token = JSON.parse(localStorage.getItem('accessToken'));
  try {
    const response = await fetch(
      `https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/tweets`,
      {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: token
        }
      }
    );
    const tweets = await response.json();
    return tweets;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const postNewTweet = async data => {
  const result = checkExpiration();
  if (!result) {
    return;
  }
  const token = JSON.parse(localStorage.getItem('accessToken'));
  try {
    const response = await fetch(
      'https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/tweets',
      {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const addLikeToTweet = async tweetId => {
  const result = checkExpiration();
  if (!result) {
    return;
  }
  const token = JSON.parse(localStorage.getItem('accessToken'));
  try {
    const response = await fetch(
      `https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/addLike/${tweetId}`,
      {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      }
    );
    const result = await response.text();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const removeLikeFromTweet = async tweetId => {
  const result = checkExpiration();
  if (!result) {
    return;
  }
  const token = JSON.parse(localStorage.getItem('accessToken'));
  try {
    const response = await fetch(
      `https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/removeLike/${tweetId}`,
      {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      }
    );
    const result = await response.text();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getSingleTweetDetails = async tweetId => {
  const result = checkExpiration();
  if (!result) {
    return;
  }
  const token = JSON.parse(localStorage.getItem('accessToken'));
  try {
    const response = await fetch(
      `https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/comments/${tweetId}`,
      {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: token
        }
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const postNewComment = async (tweetId, message) => {
  const result = checkExpiration();
  if (!result) {
    return;
  }
  const token = JSON.parse(localStorage.getItem('accessToken'));
  const data = {
    message
  };
  try {
    const response = await fetch(
      `https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/comments/${tweetId}`,
      {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteTweet = async tweetId => {
  const result = checkExpiration();
  if (!result) {
    return;
  }
  const token = JSON.parse(localStorage.getItem('accessToken'));
  try {
    const response = await fetch(
      `https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/tweets/${tweetId}`,
      {
        method: 'DELETE',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      }
    );
    const result = response.text();
    if (response.status == 200) {
      return result;
    }
    throw new Error(result);
    return;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * Get Notifications for a logged in user
 */
export const getNotificationsFromAPI = async () => {
  const result = checkExpiration();
  if (!result) {
    return;
  }
  const token = JSON.parse(localStorage.getItem('accessToken'));
  try {
    const response = await fetch(
      `https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/notifications`,
      {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: token
        }
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * Mark the notifications as read
 *  @param {array} data
 */
export const markAsReadNotifications = async data => {
  const result = checkExpiration();
  if (!result) {
    return;
  }
  const token = JSON.parse(localStorage.getItem('accessToken'));
  try {
    const response = await fetch(
      `https://us-central1-socialmedia-2fe97.cloudfunctions.net/app/api/notifications`,
      {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      }
    );
    const result = await response.text();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
