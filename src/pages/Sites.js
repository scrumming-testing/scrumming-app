import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Alert,
  AlertTitle,
} from '@material-ui/core';
import { useParams } from 'react-router';
import SiteListResults from 'src/components/sites/SiteListResults';
import SiteListToolbar from 'src/components/sites/SiteListToolbar';

// import sites from '../__mocks__/sites';

import axios from 'axios';

const Sites = () => {
  const { businessUnitID } = useParams();
  const [originalSites, setOriginalLocalSites] = useState([]);

  const [localSites, setLocalSites] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    console.log('Fetching Sites');
    console.log(businessUnitID);
    const fetchData = async () => {
      let sites = [];
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/site`,
        headers: {
          Authorization: '{{TOKEN}}'
        }
      };
      await axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          sites = response.data;
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
      if (businessUnitID !== undefined) {
        const aux = sites.filter((site) => site.businessUnitId === businessUnitID);
        setLocalSites(aux);
        setOriginalLocalSites(aux);
      } else {
        setLocalSites(sites);
        setOriginalLocalSites(sites);
      }
    };
    fetchData();
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

  const handleApiAction = (response) => {
    console.log(response);
    window.location.reload();
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
          <SiteListToolbar handleSearchData={handleSearchData} handleSelectedData={selectedData} handleApiAction={handleApiAction} />
          {dialog}
          <Box sx={{ pt: 3 }}>
            <SiteListResults data={localSites} handleSelectedData={handleSelectedData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Sites;
