import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import {
  User as UserIcon,
  Tag as TagIcon,
  MapPin as MapPinIcon,
  GitBranch as GitBranchIcon,
  Shield as ShieldIcon
} from 'react-feather';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/users',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/roles',
    icon: ShieldIcon,
    title: 'Roles'
  },
  {
    href: '/app/organizations',
    icon: TagIcon,
    title: 'Organizations'
  },
  {
    href: '/app/business-units',
    icon: GitBranchIcon,
    title: 'Business Units'
  },
  {
    href: '/app/sites',
    icon: MapPinIcon,
    title: 'Sites'
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const { user } = useAuth0();
  const [userApp, setUser] = useState({
    avatar: '',
    name: '',
    email: '',
    site: '',
    id: ''
  });
  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      // 1- FETCH ID FROM LOCAL STORAGE
      const userEmail = user.email;
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
          src={userApp.avatar}
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
          {userApp.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {userApp.site}
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
