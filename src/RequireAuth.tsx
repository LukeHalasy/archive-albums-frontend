import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useAuth, authContext } from './useAuth'

interface Props {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
  const route = useLocation().pathname;
  console.log(route);

  const { authenticated } = useContext(authContext);

  const { isAuthed } = useAuth();
  const [loading, setLoading] = useState(true);
  const [hasCookie, setHasCookie] = useState(false);

  console.log(children);

  useEffect(() => {
    // TODO: Fix authed, it's not working rn
    if (authenticated) {
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
  } else if (authenticated || hasCookie == true || route == "/") {
    return (<div>{children}</div>)
  } else {
    return (<Navigate to="/login" replace />)
  }
}
