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
import { green, orange, red } from '@material-ui/core/colors';
import { Search as SearchIcon } from 'react-feather';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';
import DeleteForm from './DeleteForm';

const BusinessListToolbar = (props) => {
  const navigate = useNavigate();

  const [dialog, setDialog] = useState(null);
  const [disableDelete, setDisableDelete] = useState(true);
  const [disableUpdate, setDisableUpdate] = useState(true);
  const [disableSites, setDisableSites] = useState(true);
  const [elementsIDs, setElementsIDs] = useState([]);

  const { handleSearchData, handleSelectedData, handleApiAction } = props;

  useEffect(() => {
    setDialog(null);
  }, []);

  useEffect(() => {
    if (handleSelectedData.length === 1) {
      setDisableUpdate(false);
      setDisableSites(false);
    } else {
      setDisableUpdate(true);
      setDisableSites(true);
    }

    if (handleSelectedData.length > 0) {
      setDisableDelete(false);
    } else {
      setDisableDelete(true);
    }
    setElementsIDs(handleSelectedData);
  }, [handleSelectedData]);

  const unmountDialog = (message) => {
    setDialog(null);
    handleApiAction(message);
  };

  const openCreateDialog = () => {
    setDialog(<CreateForm formClosed={unmountDialog} />);
  };

  const openUpdateDialog = () => {
    console.log('PASSING IDs');
    console.log(elementsIDs[0]);
    setDialog(<UpdateForm formClosed={unmountDialog} elementId={elementsIDs[0]} />);
  };

  const openDeleteDialog = () => {
    console.log('PASSING IDs');
    console.log(elementsIDs);
    setDialog(<DeleteForm formClosed={unmountDialog} dataIds={elementsIDs} />);
  };

  const openSitesDashboard = () => {
    console.log('Redirecting to B unit dashboard');
    console.log(elementsIDs[0]);
    const businessID = elementsIDs[0];
    navigate(`${businessID}/sites`);
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
            backgroundColor: green[600],
            height: 56,
            width: 200,
            mx: 1
          }}
          variant="contained"
          disabled={disableSites}
          onClick={openSitesDashboard}
        >
          Get Sites
        </Button>
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
          Add organization
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
                placeholder="Search Business Unit"
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

BusinessListToolbar.propTypes = {
  handleSearchData: PropTypes.func.isRequired,
  handleSelectedData: PropTypes.array.isRequired,
  handleApiAction: PropTypes.func.isRequired,
};

export default BusinessListToolbar;
