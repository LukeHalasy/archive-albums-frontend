import React, { useState } from 'react';
import axios from 'axios';

interface Credentials {
  username: string;
  password: string;
}

export const useAuth = () => {
  const [authed, setAuthed] = useState(false);

  return {
    authed,
    async login(credentials: Credentials) {
      const result = await axios.post('http://localhost:4000/api/v1/users/login', JSON.stringify(credentials), {
        headers: {
         'Content-Type': 'application/json'
        },
        withCredentials: true
      }) 

      if (result.status == 200) {
        setAuthed(true);
      } else {
        setAuthed(false);
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

      if (authed.status == 200 && authed.data.loggedIn == true) {
        setAuthed(true)
        return true;
      } else {
        setAuthed(false)
        return false;
      }
    },
    logout() {
      
    }
  };
}
