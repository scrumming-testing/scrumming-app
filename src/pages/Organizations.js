import { Helmet } from 'react-helmet';
import {
  Alert,
  AlertTitle,
  Box,
  Container
} from '@material-ui/core';
import OrganizationListResults from 'src/components/organization/OrganizationListResults';
import OrganizationListToolbar from 'src/components/organization/OrganizationListToolbar';
// import organizations from 'src/__mocks__/organizations';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const Organizations = () => {
  const [localOrganizations, setOrganizations] = useState([]);
  const [originalOrganizations, setOriginalLocalOrganizations] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [dialog, setDialog] = useState(null);
  const [message, setDialogMessage] = useState(undefined);

  useEffect(() => {
    // setOrganizations(organizations);
    // setOriginalLocalOrganizations(organizations);
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/organization`,
      headers: {
        Authorization: '{{TOKEN}}'
      }
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setOrganizations(response.data);
        setOriginalLocalOrganizations(response.data);
      })
      .catch((error) => {
        console.log(error);
        setDialog(
          <Alert severity="error">
            <AlertTitle>
              info
            </AlertTitle>
            message:
            <br />
            <strong>
              Error fetching data, please try later or contact support.
            </strong>
          </Alert>
        );
      });
  }, []);

  useEffect(() => {
    /* console.log('NEW MESSAGE');
    if (message !== undefined) {
      setDialog(
        <Alert severity="info">
          <AlertTitle>
            info
          </AlertTitle>
          message:
          <br />
          <strong>
            {message.data}
          </strong>
        </Alert>
      );
      setTimeout(() => {
        setDialog(null);
      }, 3000);
    } */

    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/organization`,
      headers: {
        Authorization: '{{TOKEN}}'
      }
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setOrganizations(response.data);
        setOriginalLocalOrganizations(response.data);
      })
      .catch((error) => {
        console.log(error);
        setDialog(
          <Alert severity="error">
            <AlertTitle>
              info
            </AlertTitle>
            message:
            <br />
            <strong>
              Error fetching data, please try later or contact support.
            </strong>
          </Alert>
        );
      });
  }, [message]);

  const handleSearchData = (data) => {
    if (data !== '') {
      const aux = originalOrganizations.filter((organization) => organization.name.toLowerCase().match(data));
      console.log(aux);
      setOrganizations(aux);
    } else {
      setOrganizations(originalOrganizations);
    }
  };

  const handleSelectedData = (newSelectedData) => {
    setSelectedData(newSelectedData);
  };

  const handleApiAction = (response) => {
    setDialogMessage({ id: uuid(), data: response });
  };

  return (
    <>
      <Helmet>
        <title>Organizations</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <OrganizationListToolbar handleSearchData={handleSearchData} handleSelectedData={selectedData} handleApiAction={handleApiAction} />
          {dialog}
          <Box sx={{ pt: 3 }}>
            <OrganizationListResults data={localOrganizations} handleSelectedData={handleSelectedData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Organizations;
