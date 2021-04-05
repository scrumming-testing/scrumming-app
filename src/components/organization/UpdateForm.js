import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  DialogContentText,
  TextField,
  makeStyles,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import getInitials from 'src/utils/getInitials';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
// import users from '../../__mocks__/users';
// import organizations from 'src/__mocks__/organizations';

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function UpdateForm({ formClosed, elementId }) {
  const [values, setValues] = React.useState({
    name: '',
  });
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    console.log('Dialog Update Opened');
    console.log('Fetching Organization Data');
    console.log(elementId);

    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/organization/search/id/${elementId}`,
      headers: {
        Authorization: '{{TOKEN}}'
      }
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        const organization = response.data;
        setValues((prevState) => {
          const organizationData = { ...prevState };
          organizationData.name = organization.name;
          organizationData.id = organization.id;
          return { ...organizationData };
        });
      })
      .catch((error) => {
        console.log(error);
        formClosed('Error while trying organization update');
        setOpen(false);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
    formClosed(true);
  };

  const updateOrganization = () => {
    console.log('[+] UPDATING ORGANIZATION');
    console.log(values);
    const config = {
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}/organization/${elementId}`,
      headers: {
        Authorization: '{{TOKEN}}',
        'Content-Type': 'application/json',
      },
      data: values
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        formClosed({ status: response.status, id: uuid() });
      })
      .catch((error) => {
        console.log(error);
        formClosed('Error while trying organization update');
      });
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      className="CustomDialog"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <DialogContentText>
          You are updating an organization
        </DialogContentText>
      </DialogTitle>
      <DialogContent>
        <List className={classes.root}>
          <ListItem>
            <Avatar
              src={values.avatarUrl}
              sx={{ mr: 2 }}
            >
              {getInitials(values.name)}
            </Avatar>
            <ListItemText primary={`ORGANIZATION : ${values.name}`} />
          </ListItem>
        </List>
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
        <Button onClick={updateOrganization} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UpdateForm.propTypes = {
  formClosed: PropTypes.func.isRequired,
  elementId: PropTypes.string.isRequired,
};
