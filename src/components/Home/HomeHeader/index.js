import React, { Fragment, useState, useEffect } from 'react';
import Header from './Header';
import NewTweet from '../NewTweet/index';
import Tooltip from '@material-ui/core/Tooltip';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { clearReduxStorage, setNotifications } from '../actions';
import { getNotificationsFromAPI } from '../../../services/restapi';
import Notifications from './Notifications/index';

const HomeHeader = ({
  changeDisplayProfile,
  ClearReduxStore,
  history,
  notifications,
  updateNotificationsInStore
}) => {
  const [displayNewTweet, setDisplayNewTweet] = useState(false);

  const closeNewTweetModal = () => {
    setDisplayNewTweet(false);
  };

  const callLogout = () => {
    confirmAlert({
      title: 'Confirm to Logout',
      message: 'Are you sure to do Logout.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => logout()
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

  const logout = () => {
    localStorage.clear();
    ClearReduxStore();
    history.push('/');
  };

  return (
    <Fragment>
      <Header>
        <h2>Tweet</h2>
        <span>
          <label onClick={() => setDisplayNewTweet(!displayNewTweet)}>
            <Tooltip title="New Tweet" arrow>
              <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
            </Tooltip>
          </label>
          <Tooltip
            title="Logout"
            arrow
            onClick={() => {
              callLogout();
            }}
          >
            <i className="fa fa-home fa-2x" style={{ cursor: 'pointer' }}></i>
          </Tooltip>
          {/* <Tooltip title="Notifications" arrow>
            <Fragment>
              <i
                className="fa fa-bell fa-2x"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setDisplayNotifications(!displayNotifications);
                }}
              ></i>
              {getUnReadNotifications() ? (
                <span>{getUnReadNotifications()}</span>
              ) : null}
            </Fragment>
          </Tooltip> */}
          <Notifications notifications={notifications} />
        </span>
        <Tooltip
          title="View Profile"
          arrow
          onClick={() => changeDisplayProfile()}
        >
          <p>
            <i className="fa fa-home fa-2x" aria-hidden="true"></i>
          </p>
        </Tooltip>
      </Header>
      {displayNewTweet ? (
        <NewTweet closeNewTweetModal={closeNewTweetModal} />
      ) : null}
    </Fragment>
  );
};
const mapStateToProps = state => ({
  notifications:
    state.HomeReducer && state.HomeReducer.notifications
      ? state.HomeReducer.notifications
      : []
});
const mapDispatchToProps = dispatch => ({
  ClearReduxStore: () => dispatch(clearReduxStorage()),
  updateNotificationsInStore: data => dispatch(setNotifications(data))
});

const WithConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(WithConnect, withRouter)(HomeHeader);
