import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Alert,
  AlertTitle,
} from '@material-ui/core';
import AccountListResults from 'src/components/account-scrumming/AccountListResults';
import AccountListToolbar from 'src/components/account-scrumming/AccountListToolbar';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

// import users from 'src/__mocks__/users';

const User = () => {
  const [localUsers, setLocalUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [apiAction, setApiAction] = useState('');

  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    console.log('Fetching Users');
    const fetchData = async () => {
      let users = [];
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/user`,
        headers: {
          Authorization: '{{TOKEN}}'
        }
      };
      await axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          users = response.data;
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
      setLocalUsers(users);
      setOriginalUsers(users);
    };
    fetchData();
  }, [apiAction]);

  const handleSearchData = (data) => {
    if (data !== '') {
      const aux = originalUsers.filter((user) => {
        const name = `${user.firstName} ${user.lastName}`;
        const { email, site } = user;
        const siteName = site.name;
        return name.toLowerCase().match(data) || email.toLowerCase().match(data) || siteName.toLowerCase().match(data);
      });
      setLocalUsers(aux);
    } else {
      setLocalUsers(originalUsers);
    }
  };

  const handleSelectedUsers = (newSelectedUsers) => {
    setSelectedUsers(newSelectedUsers);
  };

  const handleApiAction = (response) => {
    console.log(response);
    setApiAction(uuid());
    // window.location.reload();
  };

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <AccountListToolbar handleSearchData={handleSearchData} handleSelectedUsers={selectedUsers} handleApiAction={handleApiAction} />
          {dialog}
          <Box sx={{ pt: 3 }}>
            <AccountListResults users={localUsers} handleSelectedUsers={handleSelectedUsers} resetSelected={apiAction} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default User;
