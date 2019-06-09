import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SecuredLayout from './components/hoc/SecuredLayout';
import AuthLayout from './components/hoc/AuthLayout';
import Login from './components/Auth';

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <>
          <SecuredLayout path="/about" exact component={About} />
          <SecuredLayout path="/page1" exact component={Users} />
          <SecuredLayout path="/page2" exact component={Users} />
          <AuthLayout path="/" exact component={Login} />
        </>
      </Router>
    );
  }
}

export default App;
