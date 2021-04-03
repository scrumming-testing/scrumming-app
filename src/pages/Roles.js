import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import RoleListResults from 'src/components/roles/RoleListResults';
import RoleListToolbar from 'src/components/roles/RoleListToolbar';

import roles from '../__mocks__/roles';

const Roles = () => {
  const [originalRoles, setOriginalLocalRoles] = useState([]);

  const [localRoles, setLocalRoles] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    console.log('Fetching Roles');
    setLocalRoles(roles);
    setOriginalLocalRoles(roles);
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

  return (
    <>
      <Helmet>
        <title>Sites</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <RoleListToolbar handleSearchData={handleSearchData} handleSelectedData={selectedData} />
          <Box sx={{ pt: 3 }}>
            <RoleListResults data={localRoles} handleSelectedData={handleSelectedData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Roles;
