import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useAuth, authContext } from './useAuth'

interface Props {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
  const route = useLocation().pathname;
  console.log(route);

  const { auth } = useContext(authContext);

  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [hasCookie, setHasCookie] = useState(false);

  console.log(children);

  useEffect(() => {
    // TODO: Fix authed, it's not working rn
    console.log("CALLLLED")
    if (auth.authenticated) {
      setLoading(false);
      return;
    }

    async function checkIfUserHasCookie() {
      const result = await currentUser();
      if (result && result.data.logged_in) {
        setHasCookie(true);
      } else {
        setHasCookie(false);
      }

      setLoading(false);
    }

    checkIfUserHasCookie();
  }, [children])

  if (loading) {
    return (<h1>Loading...</h1>)
  } else if (auth.authenticated || hasCookie == true || route == "/") {
    return (<div>{children}</div>)
  } else {
    return (<Navigate to="/login" replace />)
  }
}
