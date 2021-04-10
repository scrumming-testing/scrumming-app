import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import Badges from 'src/components/account/Badges';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Account = () => {
  const [user, setUser] = useState({
    avatar: '',
    name: '',
    email: '',
    site: '',
    id: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      // 1- FETCH ID FROM LOCAL STORAGE
      const userEmail = 'santiago.villalobos@alumnos.udg.mx';
      // 2- FETCH DATA FROM SERVER
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/user/search/email/${userEmail}`,
        headers: {
          Authorization: '{{TOKEN}}'
        }
      };
      await axios(config)
        .then((response) => {
          console.log(response.data);
          const fetchedUser = response.data;
          setUser((prevState) => {
            const userData = { ...prevState };
            userData.name = `${fetchedUser.firstName} ${fetchedUser.lastName}`;
            userData.avatar = fetchedUser.avatar;
            userData.email = fetchedUser.email;
            userData.site = fetchedUser.site.name;
            userData.id = fetchedUser.id;
            return { ...userData };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    console.log('object');
    fetchUser();
  }, []);

  return (
    <>
      <Helmet>
        <title>Account | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={6}
          >
            <Grid
              item
              xs={5}
            >
              <AccountProfile user={user} />
            </Grid>
            <Grid
              item
              xs={7}
            >
              <Badges user={user} />
              <Badges user={user} />
              <Badges user={user} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
