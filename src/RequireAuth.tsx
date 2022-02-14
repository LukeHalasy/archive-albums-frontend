import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useAuth, authContext } from './useAuth'

import { Loading } from './Loading'
import { Navbar } from './Navbar'

interface Props {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
  const route = useLocation().pathname;

  const { auth } = useContext(authContext);

  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [hasCookie, setHasCookie] = useState(false);

  useEffect(() => {
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
    return (
      <React.Fragment>
        <Navbar />
        <Loading />
      </React.Fragment>
    )
  } else if (auth.authenticated || hasCookie == true) {
    if (route != "/albums") {
      return (<Navigate to="/albums" replace />)
    } else {
      return (<div>{children}</div>)
    }
  } else {
    if (route != "/") {
      return (<Navigate to="/" replace />)
    } else {
      return (<div>{children}</div>)
    }
  }
}
