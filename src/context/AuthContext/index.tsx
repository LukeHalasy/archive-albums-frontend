import { createContext } from 'react';

const AuthContext = createContext({
  auth: {
    authenticated: false,
    email: ''
  },
  setAuth: (auth: {authenticated: boolean, email: string}) => {}
});

export default AuthContext;
