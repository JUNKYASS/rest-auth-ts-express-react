import React from 'react';

import './App.css';

import AppRoutes from './pages/AppRoutes';
import Layout from './templates/Layout/Layout';
import AuthProvider from './store/Auth/AuthProvider';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthProvider>
  )
};

export default App;
