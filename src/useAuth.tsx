import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';

interface Credentials {
  username: string;
  password: string;
}

export const authContext = createContext({
  auth: {
    authenticated: false,
    username: ''
  },
  setAuth: (auth: {authenticated: boolean, username: string}) => {}
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
          username: result.data.username
        });
      } else {
        setAuth({
          authenticated: true,
          username: ''
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
          username: userReq.data.username
        })
        return userReq;
      } else {
        setAuth({
          authenticated: false,
          username: ''
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
          username: ''
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
    username: ''
  });

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
}
