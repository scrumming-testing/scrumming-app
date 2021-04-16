import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Toolbar } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from 'src/auth/LoginButton';
import LogoutButton from 'src/auth/LogoutButton';
import Logo from './Logo';

const MainNavbar = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log('user');
  console.log(user);
  console.log('isAuthenticated');
  console.log(isAuthenticated);

  return (
    <AppBar
      elevation={0}
      {...props}
    >
      <Toolbar sx={{ height: 64 }}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        { !isAuthenticated ? <LoginButton /> : <LogoutButton /> }
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
