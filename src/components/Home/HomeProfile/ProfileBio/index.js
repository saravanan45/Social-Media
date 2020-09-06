import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

const DisplayProfile = ({
  onChangeDisplayProfile,
  saveBioInfo,
  description,
  location
}) => {
  const [userDescription, setUserDescription] = useState('');
  const [userLocation, setUserLocation] = useState('');

  useEffect(() => {
    setUserDescription(description);
    setUserLocation(location);
  }, [description, location]);

  const closeModal = () => {
    onChangeDisplayProfile();
  };
  const saveModal = () => {
    const data = {
      description: userDescription,
      location: userLocation
    };
    saveBioInfo(data);
  };
  return (
    <Dialog open onClose={closeModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Bio
        <CloseIcon
          onClick={closeModal}
          style={{ position: 'relative', float: 'right' }}
        ></CloseIcon>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>You can provide your brief bio.</DialogContentText>
        <TextField
          autoFocus
          type="text"
          margin="dense"
          id="description"
          label="Description"
          fullWidth
          value={userDescription}
          onChange={e => {
            setUserDescription(e.target.value);
          }}
        />
        <TextField
          margin="dense"
          id="location"
          label="Location"
          value={userLocation}
          fullWidth
          onChange={e => {
            setUserLocation(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => saveModal()} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisplayProfile;
