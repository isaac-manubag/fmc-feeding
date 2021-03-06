import React from "react";
import styled from "styled-components";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import constants from "../../utils/constants.js";

const RightPane = styled.div`
  background-color: #fbfbfb;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeaderContainer = styled.div`
  text-align: center;
`;

class Pane extends React.Component {
  uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/kids",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: authResult => {
        console.log(authResult);
        localStorage.setItem(constants.localStorage.isAuth, true);
        return true;
      }
    }
  };

  render() {
    return (
      <RightPane>
        <HeaderContainer>
          <h1>FMC Feeding</h1>
          <h4>Login</h4>
        </HeaderContainer>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </RightPane>
    );
  }
}

export default Pane;
