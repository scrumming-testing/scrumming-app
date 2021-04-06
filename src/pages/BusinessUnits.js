import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Alert,
  AlertTitle,
} from '@material-ui/core';
import { useParams } from 'react-router';
import BusinessListResults from 'src/components/businessUnits/BusinessListResults';
import BusinessListToolbar from 'src/components/businessUnits/BusinessListToolbar';

// import businessUnits from '../__mocks__/businessUnits';

import axios from 'axios';

const BusinessUnits = () => {
  const { organizationID } = useParams();

  const [localBusinessUnits, setLocalBusinessUnits] = useState([]);
  const [originalBusinessUnits, setOriginalLocalBusinessUnits] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    console.log(organizationID);
    const fetchData = async () => {
      let businessUnits = [];
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/business-unit`,
        headers: {
          Authorization: '{{TOKEN}}'
        }
      };
      await axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          businessUnits = response.data;
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
      if (organizationID !== undefined) {
        const aux = businessUnits.filter((unit) => unit.organizationId === organizationID);
        setLocalBusinessUnits(aux);
        setOriginalLocalBusinessUnits(aux);
      } else {
        setLocalBusinessUnits(businessUnits);
        setOriginalLocalBusinessUnits(businessUnits);
      }
    };
    fetchData();
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

  const handleApiAction = (response) => {
    console.log(response);
    window.location.reload();
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
          <BusinessListToolbar handleSearchData={handleSearchData} handleSelectedData={selectedData} handleApiAction={handleApiAction} />
          {dialog}
          <Box sx={{ pt: 3 }}>
            <BusinessListResults data={localBusinessUnits} handleSelectedData={handleSelectedData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BusinessUnits;
