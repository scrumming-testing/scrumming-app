import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  DialogContentText,
  IconButton,
  Input,
  Stack,
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { PhotoCamera } from '@material-ui/icons';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function CreateForm({ formClosed }) {
  const [values, setValues] = React.useState({
    name: '',
    owner: '',
  });
  const [open, setOpen] = useState(true);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    console.log('Dialog Create Opened');
  }, []);

  const handleClose = () => {
    setOpen(false);
    formClosed(true);
  };

  const createUser = () => {
    console.log('[+] CREATING Organization');
    console.log(values);
    console.log(profileImage);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleProfileImageChange = (e) => {
    // https://medium.com/@mahesh_joshi/reactjs-nodejs-upload-image-how-to-upload-image-using-reactjs-and-nodejs-multer-918dc66d304c
    console.log(e.target.files[0]);
    // setProfileImage('/static/images/avatars/avatar_6.png');

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      console.log(reader);
      setProfileImage(reader.result);
    };

    try {
      reader.readAsDataURL(file);
    } catch {
      console.log('[-] ERROR loading image');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <DialogContentText>
          You are creating an organization
        </DialogContentText>
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            src={profileImage}
            sx={{
              height: 100,
              width: 100
            }}
          />
          <label htmlFor="icon-button-file">
            <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
            <Input accept="image/*" style={{ display: 'none' }} name="icon-button-file" id="icon-button-file" type="file" onChange={handleProfileImageChange} />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Stack>
        <TextField
          autoFocus
          margin="dense"
          value={values.name}
          id="name"
          label="Name"
          type="text"
          fullWidth
          onChange={handleChange('name')}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={createUser} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CreateForm.propTypes = {
  formClosed: PropTypes.func.isRequired,
};
