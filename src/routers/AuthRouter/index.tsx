import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import AuthContext from '@context/AuthContext'

import LoadingPage from '@pages/LoadingPage'

interface Props {
  children: React.ReactNode;
}

const AuthRouter: React.FC<Props> = ({ children }: Props) => {
  const route = useLocation().pathname;

  const { auth } = useContext(AuthContext);

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
      console.log("CHECKING IF USER HAS COOKIE");
      console.log(result);

      if (result && result.data.logged_in) {
        setHasCookie(true);
      } else {
        setHasCookie(false);
      }

      setLoading(false);
    }

    checkIfUserHasCookie();
  }, [auth.authenticated])

  console.log("Authenticated, ", auth.authenticated)
  console.log("Has Cookie, ", hasCookie)

  if (loading) {
    return (
      <LoadingPage />
    )
  } else if (auth.authenticated || hasCookie === true) {
    if (route !== "/albums") {
      console.log("HERE ABOUT TO NAVIGATE TO WRONG SPOT BECAUSE AUTHED")
      return (<Navigate to="/albums" replace />)
    } else {
      return (<div>{children}</div>)
    }
  } else {
    if (route !== "/") {
      return (<Navigate to="/" replace />)
    } else {
      console.log("HERE ABOUT TO NAVIGATE TO WRONG SPOT")
      return (<div>{children}</div>)
    }
  }
}

export default AuthRouter;
