import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SecuredLayout from './components/hoc/SecuredLayout';
import DashboardLayout from './components/hoc/DashboardLayout';
import AuthLayout from './components/hoc/AuthLayout';
import Login from './components/Auth';
import Kids from './components/Dashboard/Kids';
import FirebaseAuthProvider from './providers/FirebaseAuthProvider';


function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

class App extends React.Component {
  render() {
    return (
      <FirebaseAuthProvider>
          <Router>
            <>
              <SecuredLayout path="/about" exact component={About} />
              <DashboardLayout path="/kids" exact component={Kids} />
              <SecuredLayout path="/page2" exact component={Users} />
              <AuthLayout path="/" exact component={Login} />
            </>
          </Router>
      </FirebaseAuthProvider>
    );
  }
}

export default App;
