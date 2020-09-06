import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import NewTweeetWindow from './NewTweetWindow';
import { connect } from 'react-redux';
import { postNewTweet } from '../../../services/restapi';
import swal from 'sweetalert';
import ClipLoader from 'react-spinners/ClipLoader';
import { Loader } from '../../Common/Loader';
import { updateNewTweet } from '../actions';

function NewTweet({ closeNewTweetModal, updateNewTweetInStore }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const handleClose = () => {
    closeNewTweetModal(false);
  };
  const addEmoji = e => {
    const emoji = e.native;
    setMessage(message + emoji);
  };

  const changeEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const closeEmoji = () => {
    if (!showEmoji) {
      return;
    }
    setShowEmoji(false);
  };

  const submitTweet = async () => {
    const userId = JSON.parse(localStorage.getItem('userId')) || '';
    const data = {
      message,
      likesCount: 0,
      commentsCount: 0,
      userId
    };
    try {
      setLoading(true);
      const tweetData = await postNewTweet(data);
      updateNewTweetInStore(tweetData);
      setLoading(false);
      closeNewTweetModal(false);
      swal('Success', 'Your tweet has been posted', 'success');
    } catch (error) {
      console.log(error);
      setLoading(false);
      closeNewTweetModal(false);
      swal('OOPS!', 'Please try again', 'error');
    }
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <NewTweeetWindow>
          <DialogTitle id="form-dialog-title">
            Tweet
            <CloseIcon
              onClick={handleClose}
              style={{ position: 'relative', float: 'right' }}
            ></CloseIcon>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Post your new Tweet</DialogContentText>
            <TextField
              style={{ leftmargin: '10px' }}
              autoFocus
              margin="dense"
              id="name"
              autoComplete="off"
              type="text"
              size="medium"
              fullWidth
              multiline
              placeholder="What's on your mind!"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onFocus={() => {
                closeEmoji();
              }}
              InputProps={{
                endAdornment: (
                  <p
                    style={{ cursor: 'pointer' }}
                    onClick={() => changeEmoji()}
                  >
                    {String.fromCodePoint(0x1f60a)}
                  </p>
                )
              }}
            ></TextField>
            {showEmoji ? (
              <Picker
                onSelect={e => addEmoji(e)}
                theme="dark"
                style={{ 'max-width': 'fit-content' }}
              />
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                submitTweet();
              }}
              color="primary"
            >
              Tweet
            </Button>
          </DialogActions>
        </NewTweeetWindow>
      </Dialog>
      <Loader loading={loading ? 1 : 0}>
        <ClipLoader size={200} color={'black'} loading={loading} />
      </Loader>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    updateNewTweetInStore: data => dispatch(updateNewTweet(data))
  };
};

export default connect(null, mapDispatchToProps)(NewTweet);
