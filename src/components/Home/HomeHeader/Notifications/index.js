import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import NotificationBadge from './NotificationBadge';
import moment from 'moment';
import NotificationDropDown from './NotificationDropDown';
import { markAsReadNotifications } from '../../../../services/restapi';
import swal from 'sweetalert';
import ClipLoader from 'react-spinners/ClipLoader';
import { Loader } from '../../../Common/Loader';
import { markNotificationsasRead } from '../../actions';
import { connect } from 'react-redux';
import Comments from '../../Comments/index';

function Notifications({ notifications, markNotificationsasReadinStore }) {
  const [anchorEl, setAnchorEl] = React.useState();
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [displayComments, setDisplayComments] = useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const changeNotificationsToRead = async () => {
    const unReadNotification = notifications.filter(
      notify => notify.read === false
    );
    if (!unReadNotification.length) {
      return;
    }
    const unReadTweetIds = unReadNotification.map(notify => notify.id);
    try {
      setLoading(true);
      const response = await markAsReadNotifications(unReadTweetIds);
      markNotificationsasReadinStore(unReadTweetIds);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      swal('OOPS!', 'Unable to mark notifications as read', 'error');
    }
  };

  const closePopUp = () => {
    setDisplayComments(!displayComments);
  };

  const handleClose = () => {
    changeNotificationsToRead();
    setAnchorEl(null);
  };

  const getUnReadNotifications = () => {
    if (!(notifications && notifications.length)) {
      return 0;
    }
    const unReadNotification = notifications.filter(
      notify => notify.read === false
    );
    return unReadNotification.length;
  };

  const navigateToLikesAndComments = (tweetId, type) => {
    if (type == 'comment') {
      setSelectedId(tweetId);
      setDisplayComments(!displayComments);
    }
  };

  return (
    <div>
      <Tooltip title="Notifications" arrow>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <i className="fa fa-bell fa-2x" style={{ cursor: 'pointer' }}></i>
          {getUnReadNotifications() ? (
            <NotificationBadge>{getUnReadNotifications()}</NotificationBadge>
          ) : null}
        </Button>
      </Tooltip>
      <NotificationDropDown>
        {notifications && notifications.length ? (
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            {notifications && notifications.length
              ? notifications.map(notify => (
                  <MenuItem
                    onClick={() =>
                      navigateToLikesAndComments(notify.tweetId, notify.type)
                    }
                  >
                    <span
                      style={{
                        'margin-right': '8px',
                        position: 'relative',
                        top: '4px'
                      }}
                    >
                      {notify.type == 'like' ? (
                        <FavoriteIcon
                          color={notify.read ? 'primary' : 'secondary'}
                        />
                      ) : (
                        <CommentIcon
                          color={notify.read ? 'primary' : 'secondary'}
                        />
                      )}
                    </span>
                    <strong
                      style={{
                        'margin-right': '8px'
                      }}
                    >
                      {notify.sender}
                    </strong>
                    {notify.type == 'like' ? 'liked' : 'commented on'} your
                    post: {notify.message}
                    <span
                      style={{
                        'font-family': 'Arial,Helvetica,sans-serif',
                        opacity: '0.7',
                        position: 'absolute',
                        bottom: '-2px',
                        right: '5px',
                        'padding-top': '8px',
                        'font-size': 'x-small'
                      }}
                    >
                      {moment(notify.createdAt).fromNow()}
                    </span>
                  </MenuItem>
                ))
              : null}
          </Menu>
        ) : null}
      </NotificationDropDown>
      <Loader loading={loading ? 1 : 0}>
        <ClipLoader size={200} color={'black'} loading={loading} />
      </Loader>
      {displayComments ? (
        <Comments closePopUp={closePopUp} tweetId={selectedId} />
      ) : null}
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  markNotificationsasReadinStore: data =>
    dispatch(markNotificationsasRead(data))
});

export default connect(null, mapDispatchToProps)(Notifications);
