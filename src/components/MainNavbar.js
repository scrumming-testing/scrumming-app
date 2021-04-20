import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Toolbar } from '@material-ui/core';
import Logo from './Logo';

const MainNavbar = (props) => (
  <AppBar
    elevation={0}
    {...props}
  >
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <Box sx={{ flexGrow: 1 }} />
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
