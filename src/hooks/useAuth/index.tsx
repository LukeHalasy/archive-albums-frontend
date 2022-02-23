import { useContext  } from 'react';
import AuthContext from '@context/AuthContext'
import axios from 'axios';

interface Credentials {
  email: string;
  password: string;
}

const useAuth = () => {
  const { setAuth } = useContext(AuthContext);

  return {
    async signup(credentials: Credentials) {
      console.log(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/signup`);
      try {
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/signup`, JSON.stringify(credentials), {
          headers: {
           'Content-Type': 'application/json'
          },
          validateStatus: () => true,
          withCredentials: true
        });

        console.log(result);

        if (result.status == 201) {
          setAuth({
            authenticated: true,
            email: result.data.email
          });
        } else {
          setAuth({
            authenticated: false,
            email: ''
          });
        }

        return result;
      } catch(e) {
        setAuth({
          authenticated: false,
          email: ''
        });
      }
    },
    async login(credentials: Credentials) {
      console.log(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`);
      try {
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`, JSON.stringify(credentials), {
          headers: {
           'Content-Type': 'application/json'
          },
          validateStatus: () => true,
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
            authenticated: false,
            email: ''
          });
        }

        return result;
      } catch(error) {
        setAuth({
          authenticated: false,
          email: ''
        });
      }
    },
    async currentUser() {
      const userReq = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/currentUser`, {
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
      console.log("Calling logout");

      try {
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

        return result;
      } catch (e) {
        console.log(e);
        setAuth({
          authenticated: false,
          email: ''
        });
      }
    }
  };
};

export default useAuth;