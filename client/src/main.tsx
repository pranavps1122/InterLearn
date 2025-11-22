import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "react-toastify/dist/ReactToastify.css";
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';


const GOOGLE_CLIENT_ID="421586880738-3jvds9hs9honvn8liovv1om8sco6vodp.apps.googleusercontent.com"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
