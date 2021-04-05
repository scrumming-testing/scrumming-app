import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  DialogContentText,
  List,
  ListItem,
  ListItemText,
  makeStyles,
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

export default function DeleteForm({ formClosed, userIds }) {
  const [open, setOpen] = useState(true);
  const [usersToDelete, setUsersToDelete] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    console.log('Dialog Delete Opened');
    console.log('Users IDs');
    console.log(userIds);
    const fetchData = async () => {
      let users = [];
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/user`,
        headers: {
          Authorization: '{{TOKEN}}'
        }
      };
      await axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          users = response.data;
        })
        .catch((error) => {
          console.log(error);
          formClosed('Error while trying to fetch user');
          setOpen(false);
        });
      const deletion = users.filter((usr) => userIds.find((id) => id === usr.id));
      setUsersToDelete(deletion);
    };
    fetchData();
  }, []);

  const deleteUsers = () => {
    console.log('[+] DELETE USER');
    console.log(userIds);
    userIds.forEach(async (id) => {
      const config = {
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/user/${id}`,
        headers: {
          Authorization: '{{TOKEN}}'
        }
      };
      await axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          formClosed(response.status);
        })
        .catch((error) => {
          console.log(error);
          formClosed(error);
        });
    });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    formClosed(true);
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
          Are you sure you want to delete these users?
        </DialogContentText>
      </DialogTitle>
      <DialogContent>
        <List className={classes.root}>
          {usersToDelete.map((user) => (
            <ListItem>
              <Avatar
                src={user.avatar}
                sx={{ mr: 2 }}
              >
                {getInitials(user.firstName)}
              </Avatar>
              <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={`${user.email}`} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteUsers} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteForm.propTypes = {
  formClosed: PropTypes.func.isRequired,
  userIds: PropTypes.string.isRequired,
};
