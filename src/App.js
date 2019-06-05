import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

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
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}

export default App;
