import React from 'react';
import { combineReducers } from 'redux';
import LoginReducer from './Login/reducer';
import HomeReducer from './Home/reducer';

export default combineReducers({
  LoginReducer,
  HomeReducer
});
