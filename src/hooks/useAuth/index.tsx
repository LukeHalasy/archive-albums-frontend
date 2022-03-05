import { useContext  } from 'react';
import AuthContext from '@context/AuthContext'
import fetch from 'node-fetch'

interface Credentials {
  email: string;
  password: string;
}

const useAuth = () => {
  const { setAuth } = useContext(AuthContext);

  return {
    async signup(credentials: Credentials) {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/signup`, {
          method: 'post',
          headers: {
           'Content-Type': 'application/json'
          },
          body:  JSON.stringify(credentials),
          // @ts-ignore
          credentials: 'include' 
        });  

        const data: any = await res.json();

        if (data.status === 'success') {
          setAuth({
            authenticated: true,
            email: data.email
          });
        } else {
          setAuth({
            authenticated: false,
            email: ''
          });
        }

        return data;
      } catch(e) {
        setAuth({
          authenticated: false,
          email: ''
        });
      }
    },
    async login(credentials: Credentials) {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`, {
          method: 'post',
          headers: {
           'Content-Type': 'application/json'
          },
          body:  JSON.stringify(credentials),
          // @ts-ignore
          credentials: 'include' 
        });  

        const data: any = await res.json();

        if (data.status === 'success') {
          setAuth({
            authenticated: true,
            email: data.email
          });
        } else {
          setAuth({
            authenticated: false,
            email: ''
          });
        }

        return data;
      } catch(error) {
        setAuth({
          authenticated: false,
          email: ''
        });
      }
    },
    async currentUser() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/currentUser`, {
        method: 'get',
        headers: {
         'Content-Type': 'application/json'
        },
        // @ts-ignore
        credentials: 'include' 
      });  

      const data: any = await res.json();


      if (data.logged_in === true) {
        setAuth({
          authenticated: true,
          email: data.email
        })
        return data;
      } else {
        setAuth({
          authenticated: false,
          email: ''
        })
        return data;
      }
    },
    async logout() {

      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/logout`, {
          method: 'delete',
          headers: {
           'Content-Type': 'application/json'
          },
          // @ts-ignore
          credentials: 'include' 
        });  

        const data: any = await res.json();

        if (data.status === 'success') {
          setAuth({
            authenticated: false,
            email: ''
          });
        }

        return data;
      } catch (e) {
        setAuth({
          authenticated: false,
          email: ''
        });
      }
    }
  };
};

export default useAuth;
