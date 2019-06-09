import React from 'react';

const defaultFirebaseContext = {
  authStatusReported: false,
  isUserSignedIn: false,
};

const FirebaseAuthContext = React.createContext(defaultFirebaseContext);

export default FirebaseAuthContext;
