import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';

interface Credentials {
  username: string;
  password: string;
}

export const authContext = createContext({
  authenticated: false,
  setAuthenticated: (auth: boolean) => {}
});

export const useAuth = () => {
  const { setAuthenticated } = useContext(authContext);

  return {
    async login(credentials: Credentials) {
      const result = await axios.post('http://localhost:4000/api/v1/users/login', JSON.stringify(credentials), {
        headers: {
         'Content-Type': 'application/json'
        },
        withCredentials: true
      }) 

      if (result.status == 200) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }

      console.log(result);
      return result;
    },
    async isAuthed() {
      const authed = await axios.get('http://localhost:4000/api/v1/users/currentUser',  {
        headers: {
         'Content-Type': 'application/json'
        },
        withCredentials: true
      }) 

      console.log(authed);

      if (authed.status == 200 && authed.data.logged_in == true) {
        setAuthenticated(true)
        return true;
      } else {
        setAuthenticated(false)
        return false;
      }
    },
    async logout() {
      const result = await axios.delete('http://localhost:4000/api/v1/users/logout', {
        headers: {
         'Content-Type': 'application/json'
        },
        withCredentials: true
      }) 

      if (result.status == 200) {
        setAuthenticated(false);
      }

      console.log(result);
      return result;
    }
  };
};

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <authContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </authContext.Provider>
  );
}
