import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './context/AuthContext';
import UserInfoProvider from './context/UserInfoContext';
import AdminInfoProvider from './context/AdminInfoContext';
import FormPageProvider from './context/FormPageContext';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserInfoProvider>
        <AdminInfoProvider>
          <FormPageProvider>
            <App />
          </FormPageProvider>
        </AdminInfoProvider>
      </UserInfoProvider>
    </AuthProvider>
  </React.StrictMode>
);
