import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Auth0Provider } from '@auth0/auth0-react';

import { PolicyContextProvider } from './Context/PolicyContext.jsx'
import { PDFContextProvider } from './Context/PDFContext.jsx'
import { UserContextProvider } from './Context/UserContext.jsx';
import { NotificationContextProvider } from './Context/NotificationContext.jsx';

createRoot(document.getElementById('root')).render(

  <Auth0Provider
        domain="dev-r738q3fzlrmjbat5.us.auth0.com"
        clientId="IgVf5KHsldoKylZ7f2THrDtQkikDPvfj"
        authorizationParams={{
          redirect_uri: "https://jamesweb.onrender.com/",
          audience:"https://dev-r738q3fzlrmjbat5.us.auth0.com/api/v2/"
        }}
    >
      <UserContextProvider>
        <PolicyContextProvider>
          <PDFContextProvider>
            <NotificationContextProvider>
              <App />
            </NotificationContextProvider>
          </PDFContextProvider>
        </PolicyContextProvider>
        </UserContextProvider>
    </Auth0Provider>

)
