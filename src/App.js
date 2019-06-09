import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SecuredLayout from './components/hoc/SecuredLayout';
import DashboardLayout from './components/hoc/DashboardLayout';
import AuthLayout from './components/hoc/AuthLayout';
import Login from './components/Auth';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FirebaseAuthProvider from './providers/FirebaseAuthProvider';
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDPUL_kqpWE01g83wk2yK_ZvAXbTuClrU8',
  authDomain: 'fmc-cebu-feeding.firebaseapp.com',
};
firebase.initializeApp(config);

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Wee() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3} lg={3}>
        <Paper>
          <h4>Test</h4>
        </Paper>
      </Grid>
    </Grid>
  );
}

class App extends React.Component {
  render() {
    return (
      <FirebaseAuthProvider>
        <Router>
          <>
            <SecuredLayout path="/about" exact component={About} />
            <DashboardLayout path="/page1" exact component={Wee} />
            <SecuredLayout path="/page2" exact component={Users} />
            <AuthLayout path="/" exact component={Login} />
          </>
        </Router>
      </FirebaseAuthProvider>
    );
  }
}

export default App;
