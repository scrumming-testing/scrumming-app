import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Alert,
  AlertTitle,
} from '@material-ui/core';
import RoleListResults from 'src/components/roles/RoleListResults';
import RoleListToolbar from 'src/components/roles/RoleListToolbar';

import axios from 'axios';

const Roles = () => {
  const [originalRoles, setOriginalLocalRoles] = useState([]);

  const [localRoles, setLocalRoles] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    console.log('Fetching Roles');
    const fetchData = async () => {
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
          setDialog(null);
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
      setLocalRoles(roles);
      setOriginalLocalRoles(roles);
    };
    fetchData();
  }, []);

  const handleSearchData = (data) => {
    if (data !== '') {
      const aux = originalRoles.filter((role) => role.name.toLowerCase().match(data));
      setLocalRoles(aux);
    } else {
      setLocalRoles(originalRoles);
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
        <title>Roles</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <RoleListToolbar handleSearchData={handleSearchData} handleSelectedData={selectedData} handleApiAction={handleApiAction} />
          {dialog}
          <Box sx={{ pt: 3 }}>
            <RoleListResults data={localRoles} handleSelectedData={handleSelectedData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Roles;
