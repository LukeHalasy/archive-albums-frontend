import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

interface Props {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
  const navigate = useNavigate();
  const { authed, isAuthed } = useAuth();
  const [loading, setLoading] = useState(true);
  const [hasCookie, setHasCookie] = useState(false);

  useEffect(() => {
    if (authed) {
      setLoading(false);
      return;
    }

    async function checkIfUserHasCookie() {
      const result = await isAuthed();
      console.log("Has cookie " + result);
      setHasCookie(result);
      setLoading(false);
    }

    checkIfUserHasCookie();
  }, [])

  if (loading) {
    return (<h1>Loading...</h1>)
  } else if (authed || hasCookie) {
    return (children)
  } else {
    return (<Navigate to="/login" replace />)
  }

  
}
