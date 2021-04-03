import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  DialogContentText,
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import sites from '../../__mocks__/sites';

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

export default function UpdateForm({ formClosed, elementId }) {
  const [values, setValues] = React.useState({
    name: '',
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    console.log('Dialog Update Opened');
    console.log('Fetching Site Data');
    console.log(elementId);
    const site = sites.find((s) => s.id === elementId);

    if (site !== undefined) {
      console.log('Found site');
      console.log(site);
      setValues((prevState) => {
        const siteData = { ...prevState };
        siteData.name = site.name;
        siteData.id = site.id;
        return { ...siteData };
      });
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    formClosed(true);
  };

  const update = () => {
    console.log('[+] UPDATING Site');
    console.log(values);
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
          You are updating a site
        </DialogContentText>
      </DialogTitle>
      <DialogContent>
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
        <Button onClick={update} color="primary">
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
