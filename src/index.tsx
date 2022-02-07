import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Login } from './Login';
import { Footer } from './Footer';
import { Logout } from './Logout';
import { SignUp } from './SignUp';
import { AddAlbum } from './AddAlbum';
import { RequireAuth } from './RequireAuth';
import { AuthProvider } from './useAuth';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequireAuth><App /></RequireAuth>} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="addalbum" element={<RequireAuth><AddAlbum /></RequireAuth>} />
          <Route path="logout" element={<RequireAuth><Logout /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
