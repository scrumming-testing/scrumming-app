import React from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  // const navigate = useNavigate();
  const history = createBrowserHistory();

  const onRedirectCallback = (appState) => {
    console.log('APPSTATE');
    console.log(appState);
    // navigate(appState?.returnTo || window.location.pathname);
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;

Auth0ProviderWithHistory.propTypes = {
  children: PropTypes.object
};
