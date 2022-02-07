import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';

interface Credentials {
  email: string;
  password: string;
}

export const authContext = createContext({
  auth: {
    authenticated: false,
    email: ''
  },
  setAuth: (auth: {authenticated: boolean, email: string}) => {}
});

export const useAuth = () => {
  const { setAuth } = useContext(authContext);

  return {
    async login(credentials: Credentials) {
      const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`, JSON.stringify(credentials), {
        headers: {
         'Content-Type': 'application/json'
        },
        withCredentials: true
      }) 

      console.log(result);

      if (result.status == 200) {
        setAuth({
          authenticated: true,
          email: result.data.email
        });
      } else {
        setAuth({
          authenticated: true,
          email: ''
        });
      }

      console.log(result);
      return result;
    },
    async currentUser() {
      const userReq = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/currentUser`,  {
        headers: {
         'Content-Type': 'application/json'
        },
        withCredentials: true
      }) 

      console.log(userReq);

      if (userReq.status == 200 && userReq.data.logged_in == true) {
        setAuth({
          authenticated: true,
          email: userReq.data.email
        })
        return userReq;
      } else {
        setAuth({
          authenticated: false,
          email: ''
        })
        return userReq;
      }
    },
    async logout() {
      const result = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/logout`, {
        headers: {
         'Content-Type': 'application/json'
        },
        withCredentials: true
      }) 

      if (result.status == 200) {
        setAuth({
          authenticated: false,
          email: ''
        });
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
  const [auth, setAuth] = useState({
    authenticated: false,
    email: ''
  });

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
}
