import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './context/AuthContext';
import UserInfoProvider from './context/UserInfoContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    </AuthProvider>
  </React.StrictMode>
);
