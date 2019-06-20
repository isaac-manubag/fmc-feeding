import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import DashboardLayout from "./components/hoc/DashboardLayout";
import AuthLayout from "./components/hoc/AuthLayout";
import Login from "./components/Auth";
import Kids from "./components/Dashboard/Kids";
import Staff from "./components/Dashboard/Staff";
import Schedule from "./components/Dashboard/Schedule";
import FirebaseAuthProvider from "./providers/FirebaseAuthProvider";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"].join(",")
  }
});
class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <FirebaseAuthProvider>
          <Router>
            <>
              <DashboardLayout path="/kids" exact component={Kids} />
              <DashboardLayout path="/staff" exact component={Staff} />
              <DashboardLayout path="/schedule" exact component={Schedule} />
              <AuthLayout path="/" exact component={Login} />
            </>
          </Router>
        </FirebaseAuthProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
