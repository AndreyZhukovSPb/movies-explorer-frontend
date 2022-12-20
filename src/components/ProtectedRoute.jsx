import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const {isLoggedIn, children} = props;
  return (
    isLoggedIn ? children : <Redirect to="/" />
  )
}

export default ProtectedRoute;