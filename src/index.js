import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render((
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
