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

export default function DeleteForm({ formClosed, dataIds }) {
  const [open, setOpen] = useState(true);
  const [elementsToDelete, setElementsToDelete] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    console.log('Dialog Delete Opened');
    console.log('BUnits IDs');
    console.log(dataIds);
    const fetchData = async () => {
      let businessUnits = [];
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/business-unit`,
        headers: {
          Authorization: '{{TOKEN}}'
        }
      };
      await axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          businessUnits = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      const deletion = businessUnits.filter((e) => dataIds.find((id) => id === e.id));
      setElementsToDelete(deletion);
    };
    fetchData();
  }, []);

  const deleteElements = () => {
    console.log('[+] DELETE ORGANIZATIONS');
    console.log(elementsToDelete);
    dataIds.forEach(async (id) => {
      const config = {
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/business-unit/${id}`,
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
          Are you sure you want to delete these business units?
        </DialogContentText>
      </DialogTitle>
      <DialogContent>
        <List className={classes.root}>
          {elementsToDelete.map((e) => (
            <ListItem>
              <Avatar
                src={e.avatarUrl}
                sx={{ mr: 2 }}
              >
                {getInitials(e.name)}
              </Avatar>
              <ListItemText primary={`${e.name}`} secondary={`useful data ${e.name}`} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteElements} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteForm.propTypes = {
  formClosed: PropTypes.func.isRequired,
  dataIds: PropTypes.string.isRequired,
};
