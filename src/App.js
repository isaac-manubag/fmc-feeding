import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SecuredLayout from "./components/hoc/SecuredLayout";
import DashboardLayout from "./components/hoc/DashboardLayout";
import AuthLayout from "./components/hoc/AuthLayout";
import Login from "./components/Auth";
import Kids from "./components/Dashboard/Kids";
import Staff from "./components/Dashboard/Staff";
import FirebaseAuthProvider from "./providers/FirebaseAuthProvider";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"].join(",")
  }
});

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <FirebaseAuthProvider>
          <Router>
            <>
              <SecuredLayout path="/about" exact component={About} />
              <DashboardLayout path="/kids" exact component={Kids} />
              <DashboardLayout path="/staff" exact component={Staff} />
              <SecuredLayout path="/page2" exact component={Users} />
              <AuthLayout path="/" exact component={Login} />
            </>
          </Router>
        </FirebaseAuthProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
