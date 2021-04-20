import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import LogoutButton from 'src/auth/LogoutButton';
import LoginButton from 'src/auth/LoginButton';
import Logo from './Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const { isAuthenticated } = useAuth0();

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        {
          isAuthenticated
            ? (
              <>
                <Hidden lgDown>
                  <IconButton color="inherit">
                    <Badge
                      badgeContent={notifications.length}
                      color="primary"
                      variant="dot"
                    >
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton color="inherit">
                    <InputIcon />
                  </IconButton>
                </Hidden>
                <LogoutButton />
                <Hidden lgUp>
                  <IconButton
                    color="inherit"
                    onClick={onMobileNavOpen}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>
              </>
            )
            : <LoginButton />
        }
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
