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

      console.log(result);
    },
    logout() {
      
    }
  };
}
