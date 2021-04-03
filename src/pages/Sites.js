import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useParams } from 'react-router';
import SiteListResults from 'src/components/sites/SiteListResults';
import SiteListToolbar from 'src/components/sites/SiteListToolbar';

import sites from '../__mocks__/sites';

const Sites = () => {
  const { businessUnitID } = useParams();
  const [originalSites, setOriginalLocalSites] = useState([]);

  const [localSites, setLocalSites] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    console.log('Fetching Sites');
    console.log(businessUnitID);
    const aux = sites.filter((site) => site.businessUnit === businessUnitID);
    setLocalSites(aux);
    setOriginalLocalSites(aux);
  }, []);

  const handleSearchData = (data) => {
    if (data !== '') {
      const aux = originalSites.filter((site) => site.name.toLowerCase().match(data));
      setLocalSites(aux);
    } else {
      setLocalSites(originalSites);
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
          <SiteListToolbar handleSearchData={handleSearchData} handleSelectedData={selectedData} />
          <Box sx={{ pt: 3 }}>
            <SiteListResults data={localSites} handleSelectedData={handleSelectedData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Sites;
