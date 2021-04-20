import { useEffect } from 'react';
// import axios from 'axios';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  User as UserIcon,
  Tag as TagIcon
} from 'react-feather';
import NavItem from './NavItem';

/*
  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith'
  };
*/

const items = [
  {
    href: '/app/organizations',
    icon: TagIcon,
    title: 'Organizations'
  },
  {
    href: '/app/users',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/roles',
    icon: UserIcon,
    title: 'Roles'
  },
  {
    href: '/app/sites',
    icon: UserIcon,
    title: 'Sites'
  },
  {
    href: '/app/business-units',
    icon: UserIcon,
    title: 'Business Units'
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  // const { user } = useAuth0();
  // console.log(user);

  const user = {
    avatar: '',
    name: '',
    email: '',
    site: '',
    id: ''
  };

  useEffect(() => {
    /*
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
    fetchUser();
    */
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.site}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Need more?
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Upgrade to PRO version and access 20 more screens
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Button
            color="primary"
            component="a"
            href="https://react-material-kit.devias.io"
            variant="contained"
          >
            See PRO version
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
