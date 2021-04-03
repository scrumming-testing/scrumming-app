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

import businessUnits from '../../__mocks__/businessUnits';

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
    console.log('Fetching B Unit Data');
    console.log(elementId);
    const bUnit = businessUnits.find((org) => org.id === elementId);

    if (bUnit !== undefined) {
      console.log('Found bUnit');
      console.log(bUnit);
      setValues((prevState) => {
        const bUnitData = { ...prevState };
        bUnitData.name = bUnit.name;
        bUnitData.id = bUnit.id;
        return { ...bUnitData };
      });
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    formClosed(true);
  };

  const update = () => {
    console.log('[+] UPDATING Business Unit');
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
          You are updating an organization
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
