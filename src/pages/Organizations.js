import { Helmet } from 'react-helmet';
import {
  Alert,
  AlertTitle,
  Box,
  Container
} from '@material-ui/core';
import OrganizationListResults from 'src/components/organization/OrganizationListResults';
import OrganizationListToolbar from 'src/components/organization/OrganizationListToolbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Organizations = () => {
  const [localOrganizations, setOrganizations] = useState([]);
  const [originalOrganizations, setOriginalLocalOrganizations] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
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
    console.log(response);
    window.location.reload();
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
