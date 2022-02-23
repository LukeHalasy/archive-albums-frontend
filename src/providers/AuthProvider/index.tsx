import React, { useState } from 'react';
import AuthContext from '@context/AuthContext';

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({
    authenticated: false,
    email: ''
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
