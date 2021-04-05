import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  DialogContentText,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
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
import axios from 'axios';

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
  const [rolesData, setRolesData] = useState([]);
  const [sitesData, setSitesData] = useState([]);
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    site: '',
  });
  const [open, setOpen] = useState(true);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    console.log('Dialog Create Opened');
    console.log('Fetching Sites');
    const fetchSitesData = async () => {
      let sites = [];
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/site`,
        headers: {
          Authorization: '{{TOKEN}}'
        }
      };
      await axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          sites = response.data;
        })
        .catch((error) => {
          console.log(error);
          formClosed(error);
          setOpen(false);
        });
      setSitesData(sites);
    };
    fetchSitesData();
    console.log('Fetching Roles');
    const fetchRolesData = async () => {
      let roles = [];
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/role`,
        headers: {
          Authorization: '{{TOKEN}}'
        }
      };
      await axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          roles = response.data;
        })
        .catch((error) => {
          console.log(error);
          formClosed(error);
          setOpen(false);
        });
      setRolesData(roles);
    };
    fetchRolesData();
  }, []);

  const handleClose = () => {
    setOpen(false);
    formClosed(true);
  };
  const createUser = () => {
    console.log('[+] CREATING USER');
    console.log(values);
    console.log(profileImage);
    const data = JSON.stringify({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      site: values.site,
      role: values.role,
      avatar: profileImage
    });
    console.log(data);

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/user`,
      headers: {
        Authorization: '{{TOKEN}}',
        'Content-Type': 'application/json'
      },
      data
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        formClosed(response.status);
      })
      .catch((error) => {
        console.log(error);
        formClosed(error);
      });
    setOpen(false);
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
          You are creating an user
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
          value={values.firstName}
          id="firstName"
          label="First Name"
          type="text"
          fullWidth
          onChange={handleChange('firstName')}
        />
        <TextField
          margin="dense"
          value={values.lastName}
          id="lastName"
          label="Last Name"
          type="text"
          fullWidth
          onChange={handleChange('lastName')}
        />
        <TextField
          margin="dense"
          value={values.email}
          id="email"
          label="email"
          type="text"
          fullWidth
          onChange={handleChange('email')}
        />
        <InputLabel htmlFor="roles">Role</InputLabel>
        <Select
          value={values.role}
          fullWidth
          onChange={handleChange('role')}
          inputProps={{
            name: 'roles',
            id: 'roles',
          }}
        >
          {rolesData.map((e) => (
            <MenuItem key={`role-${e.id}`} value={e.id}>{`${e.name}`}</MenuItem>
          ))}
        </Select>
        <InputLabel htmlFor="sites">Site</InputLabel>
        <Select
          value={values.site}
          fullWidth
          onChange={handleChange('site')}
          inputProps={{
            name: 'sites',
            id: 'sites',
          }}
        >
          {sitesData.map((e) => (
            <MenuItem key={`role-${e.id}`} value={e.id}>{`${e.name}`}</MenuItem>
          ))}
        </Select>
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
