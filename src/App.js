import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import SecuredLayout from './components/hoc/SecuredLayout';
import AuthLayout from './components/hoc/AuthLayout';
import constants from './utils/constants';

const config = {
  apiKey: 'AIzaSyDPUL_kqpWE01g83wk2yK_ZvAXbTuClrU8',
  authDomain: 'fmc-cebu-feeding.firebaseapp.com',
};
firebase.initializeApp(config);

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/about',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      console.log(authResult);

      localStorage.setItem(constants.localStorage.isAuth, true);

      return true;
    },
  },
};

function Index() {
  return (
    <>
      <h2>Home</h2>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  return (
    <Router>
      <>
        <SecuredLayout path="/about" exact component={About} />
        <SecuredLayout path="/users" exact component={Users} />
        <AuthLayout path="/" exact component={Index} />
      </>
    </Router>
  );
}

export default App;
