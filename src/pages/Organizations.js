import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import OrganizationListResults from 'src/components/organization/OrganizationListResults';
import OrganizationListToolbar from 'src/components/organization/OrganizationListToolbar';
import organizations from 'src/__mocks__/organizations';
import { useEffect, useState } from 'react';

const Organizations = () => {
  const [localOrganizations, setOrganizations] = useState([]);
  const [originalOrganizations, setOriginalLocalOrganizations] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    setOrganizations(organizations);
    setOriginalLocalOrganizations(organizations);
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
          <OrganizationListToolbar handleSearchData={handleSearchData} handleSelectedData={selectedData} />
          <Box sx={{ pt: 3 }}>
            <OrganizationListResults data={localOrganizations} handleSelectedData={handleSelectedData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Organizations;
