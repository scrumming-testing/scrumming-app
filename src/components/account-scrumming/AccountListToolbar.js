import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { orange, red } from '@material-ui/core/colors';
import { Search as SearchIcon } from 'react-feather';
import { useEffect, useState } from 'react';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';
import DeleteForm from './DeleteForm';

const AccountListToolbar = (props) => {
  const [dialog, setDialog] = useState(null);
  const [disableDelete, setDisableDelete] = useState(true);
  const [disableUpdate, setDisableUpdate] = useState(true);
  const [usersIDs, setUsersIDs] = useState([]);

  const { handleSearchData, handleSelectedUsers, handleApiAction } = props;

  useEffect(() => {
    setDialog(null);
  }, []);

  useEffect(() => {
    if (handleSelectedUsers.length === 1) {
      setDisableUpdate(false);
    } else {
      setDisableUpdate(true);
    }

    if (handleSelectedUsers.length > 0) {
      setDisableDelete(false);
    } else {
      setDisableDelete(true);
    }
    setUsersIDs(handleSelectedUsers);
  }, [handleSelectedUsers]);

  const unmountDialog = (message) => {
    setDialog(null);
    handleApiAction(message);
  };

  const openCreateDialog = () => {
    setDialog(<CreateForm formClosed={unmountDialog} />);
  };

  const openUpdateDialog = () => {
    setDialog(<UpdateForm formClosed={unmountDialog} userId={usersIDs[0]} />);
  };

  const openDeleteDialog = () => {
    console.log('PASSING IDs');
    console.log(usersIDs);
    setDialog(<DeleteForm formClosed={unmountDialog} userIds={usersIDs} />);
  };

  return (
    <Box {...props}>
      {dialog}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          sx={{
            backgroundColor: red[600],
            height: 56,
            width: 56,
            mx: 1
          }}
          variant="contained"
          disabled={disableDelete}
          onClick={openDeleteDialog}
        >
          Delete
        </Button>
        <Button
          sx={{
            backgroundColor: orange[600],
            height: 56,
            width: 56,
            mx: 1
          }}
          variant="contained"
          disabled={disableUpdate}
          onClick={openUpdateDialog}
        >
          Update
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={openCreateDialog}
        >
          Add account
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search User"
                variant="outlined"
                onChange={(e) => handleSearchData(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

AccountListToolbar.propTypes = {
  handleSearchData: PropTypes.func.isRequired,
  handleSelectedUsers: PropTypes.array.isRequired,
  handleApiAction: PropTypes.func.isRequired,
};

export default AccountListToolbar;
