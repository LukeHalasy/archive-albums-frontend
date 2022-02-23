import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthRouter  from '@routers/AuthRouter';
import AuthProvider  from '@providers/AuthProvider';
import LoadingPage from '@pages/LoadingPage';

import './index.css';

const Home = lazy(() => import('@pages/Home'))
const Albums = lazy(() => import('@pages/Albums'))

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={<AuthRouter><Home /></AuthRouter>} />
            <Route path="/albums" element={<AuthRouter><Albums /></AuthRouter>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
