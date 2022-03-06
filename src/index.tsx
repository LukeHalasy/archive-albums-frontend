import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthRouter  from '@routers/AuthRouter';
import AuthProvider  from '@providers/AuthProvider';
import Home from '@pages/Home';
import Albums from '@pages/Albums';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthRouter><Home /></AuthRouter>} />
          <Route path="/albums" element={<AuthRouter><Albums /></AuthRouter>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
