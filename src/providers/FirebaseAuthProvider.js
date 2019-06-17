import React from "react";
import FirebaseAuthContext from "../contexts/FirebaseAuthContext";
import firebase from "../utils/firebase";
import styled from "styled-components";

const defaultFirebaseContext = {
  authStatusReported: false,
  isUserSignedIn: false
};

class FirebaseAuthProvider extends React.Component {
  state = defaultFirebaseContext;

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user =>
      this.setState({
        authStatusReported: true,
        isUserSignedIn: !!user
      })
    );
  }

  render() {
    const { children } = this.props;
    const { authStatusReported, isUserSignedIn } = this.state;

    if (!authStatusReported) {
      return <SVG src="/assets/svg/ripple-lg.svg" alt="pacman loader" />;
    }

    return (
      <FirebaseAuthContext.Provider
        value={{ isUserSignedIn, authStatusReported }}
      >
        {authStatusReported && children}
      </FirebaseAuthContext.Provider>
    );
  }
}

export default FirebaseAuthProvider;

const SVG = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
