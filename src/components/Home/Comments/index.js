import React, { useEffect, useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import ClipLoader from 'react-spinners/ClipLoader';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { Loader } from '../../Common/Loader';
import CommentsFrame from './CommentsFrame';
import swal from 'sweetalert';
import {
  getSingleTweetDetails,
  postNewComment,
  addLikeToTweet,
  removeLikeFromTweet
} from '../../../services/restapi';
import HomeDate from '../HomeDate';
import HomeTweetsBody from '../HomeTweetsBody';
import HomeOptions from '../HomeOptions';
import { deriveDateDetails } from '../../Common/utils/DateSplitter';
import CommentMessageBody from './CommentMessageBody';
import CommentTweetImage from './CommentTweetImage';
import CommentTweetContainer from './CommentTweetContainer';
import CommentTweetOptions from './CommentTweetOptions';
import CommentsBody from './CommentsBody';
import {
  updateTweetWithComment,
  addLikeToTweetWithComment,
  removeLikeFromTweetWithComment,
  addCommentToTweetWithComment,
  updateTweetsForNewComment,
  incrementLikeCount,
  decrementLikeCount
} from '../actions';
import { connect } from 'react-redux';

function Comments({
  closePopUp,
  tweetId,
  userName,
  tweetWithComments,
  updateTweetWithCommentInStore,
  removeLikeFromTweetWithCommentInStore,
  addLikeFromTweetWithCommentInStore,
  addCommentToTweetWithCommentInStore,
  updateCommentsCountInTweetsInStore,
  incrementLikeCountInStore,
  decrementLikeCountInStore
}) {
  // const tweetId = match.params.id;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [tweetInfo, setTweetInfo] = useState({});
  const [newComment, setNewComment] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    getSingleTweet();
  }, []);

  useEffect(() => {
    setTweetInfo(tweetWithComments);
  }, [tweetWithComments]);

  const getSingleTweet = async () => {
    setLoading(true);
    try {
      const tweetInfo = await getSingleTweetDetails(tweetId);
      setLoading(false);
      debugger;
      updateTweetWithCommentInStore(tweetInfo);
      // setTweetInfo(tweetInfo);
      console.log(tweetInfo);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal('OOPS!', 'Unable to open comments', 'error');
    }
  };

  const handleClose = () => {
    closePopUp();
    setOpen(false);
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

  const submitNewComment = async () => {
    if (!newComment.length) {
      swal('Error!', `Empty comment can't be posted`, 'error');
      return;
    }
    try {
      setLoading(true);
      const response = await postNewComment(tweetId, newComment);
      updateCommentsCountInTweetsInStore(tweetId);
      setLoading(false);
      addCommentToTweetWithCommentInStore(response);
      setNewComment('');
      return;
    } catch (error) {
      console.log(error);
      swal('OOPS!', `Your comment can't be posted now`, 'error');
    }
  };

  const onChangeLike = async (tweetId, bool) => {
    try {
      setLoading(true);
      await changeLike(tweetId, bool);
      const data = {
        tweetId,
        bool
      };
      if (bool) {
        removeLikeFromTweetWithCommentInStore(data);
        setLoading(false);
        return;
      }
      addLikeFromTweetWithCommentInStore(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      swal('OOPS!', 'Something wrong', 'error');
    }
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

  const addEmoji = e => {
    const emoji = e.native;
    setNewComment(newComment + emoji);
  };

  const tweetDescription = (tweetInfo && tweetInfo.tweetDetails) || false;

  return (
    <div>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <CommentsFrame>
          {loading ? (
            <Loader loading={loading ? 1 : 0}>
              <ClipLoader size={200} color={'black'} loading={loading} />
            </Loader>
          ) : (
            <Fragment>
              <DialogTitle id="form-dialog-title">
                <CloseIcon
                  onClick={handleClose}
                  style={{ position: 'relative', float: 'right' }}
                ></CloseIcon>
              </DialogTitle>
              <DialogContent>
                <CommentTweetContainer>
                  <Grid container spacing={16}>
                    <Grid container item sm={4}>
                      <CommentTweetImage>
                        <img
                          src={
                            tweetDescription
                              ? tweetInfo.tweetDetails.imageURL
                              : ''
                          }
                        ></img>
                      </CommentTweetImage>
                    </Grid>
                    <Grid container item sm={8}>
                      <CommentMessageBody>
                        <title>
                          {tweetDescription
                            ? tweetInfo.tweetDetails.userName
                            : ''}
                        </title>
                        <label>
                          {tweetDescription
                            ? tweetInfo.tweetDetails.message
                            : ''}
                        </label>
                        <br />
                        <CommentTweetOptions>
                          <label
                            onClick={() => {
                              onChangeLike(
                                tweetId,
                                tweetDescription &&
                                  tweetInfo.tweetDetails.likedBy &&
                                  tweetInfo.tweetDetails.likedBy.includes(
                                    userName
                                  )
                              );
                            }}
                          >
                            {tweetDescription &&
                            tweetInfo.tweetDetails.likedBy &&
                            tweetInfo.tweetDetails.likedBy.includes(
                              userName
                            ) ? (
                              <i
                                style={{ color: 'deeppink' }}
                                className="fa fa-heart"
                              ></i>
                            ) : (
                              <i className="fa fa-heart-o"></i>
                            )}
                            <span>
                              {' '}
                              {tweetDescription
                                ? tweetInfo.tweetDetails.likesCount
                                : 0}{' '}
                              {tweetInfo &&
                              tweetInfo.tweetDetails &&
                              tweetInfo.tweetDetails.likesCount == 1
                                ? 'like'
                                : 'likes'}
                            </span>
                          </label>
                          <label>
                            <i className="fa fa-comments-o"></i>
                            <span>
                              {' '}
                              {tweetDescription
                                ? tweetInfo.tweetDetails.commentsCount
                                : 0}{' '}
                              {tweetInfo &&
                              tweetInfo.tweetDetails &&
                              tweetInfo.tweetDetails.commentsCount == 1
                                ? 'comment'
                                : 'comments'}
                            </span>
                          </label>
                        </CommentTweetOptions>
                        <HomeDate>
                          {tweetDescription
                            ? deriveDateDetails(
                                tweetInfo.tweetDetails.createdAt,
                                'TIME'
                              )
                            : ''}{' '}
                          {tweetDescription
                            ? deriveDateDetails(
                                tweetInfo.tweetDetails.createdAt,
                                'DATE'
                              )
                            : ''}
                          {tweetDescription
                            ? deriveDateDetails(
                                tweetInfo.tweetDetails.createdAt,
                                'COMPLETOR'
                              )
                            : ''}{' '}
                          {tweetDescription
                            ? deriveDateDetails(
                                tweetInfo.tweetDetails.createdAt,
                                'MONTH'
                              )
                            : ''}{' '}
                          {tweetDescription
                            ? deriveDateDetails(
                                tweetInfo.tweetDetails.createdAt,
                                'YEAR'
                              )
                            : ''}
                        </HomeDate>
                      </CommentMessageBody>
                    </Grid>
                  </Grid>
                </CommentTweetContainer>
                {tweetInfo && tweetInfo.comments && tweetInfo.comments.length
                  ? tweetInfo.comments.map((commentSection, index) => (
                      <CommentsBody
                        lastOfType={
                          tweetInfo &&
                          tweetInfo.comments &&
                          tweetInfo.comments.length - 1 === index
                            ? 1
                            : 0
                        }
                      >
                        <img src={commentSection.imageURL} />
                        <p>
                          <title>{commentSection.userName}</title>
                          <label>{commentSection.message}</label>
                          <div>
                            {' '}
                            {deriveDateDetails(
                              commentSection.createdAt,
                              'TIME'
                            )}{' '}
                            {deriveDateDetails(
                              commentSection.createdAt,
                              'DATE'
                            )}
                            {deriveDateDetails(
                              commentSection.createdAt,
                              'COMPLETOR'
                            )}{' '}
                            {deriveDateDetails(
                              commentSection.createdAt,
                              'MONTH'
                            )}{' '}
                            {deriveDateDetails(
                              commentSection.createdAt,
                              'YEAR'
                            )}
                          </div>
                        </p>
                      </CommentsBody>
                    ))
                  : null}
                <TextField
                  autoFocus
                  margin="dense"
                  id="comment"
                  label="Add a Comment"
                  type="text"
                  fullWidth
                  value={newComment}
                  onChange={e => {
                    setNewComment(e.target.value);
                  }}
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
                />
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
                  style={{ 'margin-right': '10px' }}
                  variant="contained"
                  onClick={submitNewComment}
                  color="primary"
                >
                  Post
                </Button>
              </DialogActions>
            </Fragment>
          )}
        </CommentsFrame>
      </Dialog>
      <Loader loading={loading ? 1 : 0}>
        <ClipLoader size={200} color={'black'} loading={loading} />
      </Loader>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  updateTweetWithCommentInStore: data => dispatch(updateTweetWithComment(data)),
  removeLikeFromTweetWithCommentInStore: () =>
    dispatch(removeLikeFromTweetWithComment()),
  addLikeFromTweetWithCommentInStore: () =>
    dispatch(addLikeToTweetWithComment()),
  addCommentToTweetWithCommentInStore: data =>
    dispatch(addCommentToTweetWithComment(data)),
  updateCommentsCountInTweetsInStore: data =>
    dispatch(updateTweetsForNewComment(data)),
  incrementLikeCountInStore: data => dispatch(incrementLikeCount(data)),
  decrementLikeCountInStore: data => dispatch(decrementLikeCount(data))
});

const mapStateToProps = state => {
  return {
    tweetWithComments: state.HomeReducer.tweetWithComments,
    userName: state.HomeReducer.UserProfile
      ? state.HomeReducer.UserProfile.userName
      : ''
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
