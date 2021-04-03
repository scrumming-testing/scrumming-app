import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useParams } from 'react-router';
import BusinessListResults from 'src/components/businessUnits/BusinessListResults';
import BusinessListToolbar from 'src/components/businessUnits/BusinessListToolbar';

import businessUnits from '../__mocks__/businessUnits';

const BusinessUnits = () => {
  const { organizationID } = useParams();

  const [localBusinessUnits, setLocalBusinessUnits] = useState([]);
  const [originalBusinessUnits, setOriginalLocalBusinessUnits] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    const aux = businessUnits.filter((unit) => unit.organization === organizationID);
    setLocalBusinessUnits(aux);
    setOriginalLocalBusinessUnits(aux);
  }, []);

  const handleSearchData = (data) => {
    if (data !== '') {
      const aux = originalBusinessUnits.filter((unit) => unit.name.toLowerCase().match(data));
      setLocalBusinessUnits(aux);
    } else {
      setLocalBusinessUnits(originalBusinessUnits);
    }
  };

  const handleSelectedData = (newSelectedData) => {
    setSelectedData(newSelectedData);
  };

  return (
    <>
      <Helmet>
        <title>Business Units</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <BusinessListToolbar handleSearchData={handleSearchData} handleSelectedData={selectedData} />
          <Box sx={{ pt: 3 }}>
            <BusinessListResults data={localBusinessUnits} handleSelectedData={handleSelectedData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BusinessUnits;
