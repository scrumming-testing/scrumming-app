import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AccountListResults from 'src/components/account-scrumming/AccountListResults';
import AccountListToolbar from 'src/components/account-scrumming/AccountListToolbar';
import users from 'src/__mocks__/users';
import { useEffect, useState } from 'react';

const User = () => {
  const [localUsers, setUsers] = useState([]);

  useEffect(() => {
    setUsers(users);
  }, []);

  const handleSearchData = (data) => {
    if (data !== '') {
      const aux = users.filter((user) => user.name.toLowerCase().match(data));
      console.log(aux);
      setUsers(aux);
    } else {
      setUsers(users);
    }
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
          <AccountListToolbar handleSearchData={handleSearchData} />
          <Box sx={{ pt: 3 }}>
            <AccountListResults users={localUsers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default User;
