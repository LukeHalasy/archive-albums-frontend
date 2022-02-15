import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth  from './RequireAuth';
import { AuthProvider } from './useAuth';
import { Loading } from './Loading';

import reportWebVitals from './reportWebVitals';

const App = lazy(() => import('./App'))
const AddAlbum = lazy(() => import('./AddAlbum'))

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<RequireAuth><App /></RequireAuth>} />
            <Route path="/albums" element={<RequireAuth><AddAlbum /></RequireAuth>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
