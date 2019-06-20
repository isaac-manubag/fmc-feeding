import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import StaffCard from "./staffCard";
import firebase from "../../../utils/firebase";
import "firebase/firestore";

const db = firebase.firestore();

class Staff extends React.Component {
  state = {
    staff: [],
  };

  componentDidMount() {
    db.collection("users").onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          const {uid, displayName, email, provider, photoURL} = change.doc.data();
          this.setState({
            staff: [
              ...this.state.staff,
              {
                uid,
                displayName,
                email,
                provider,
                photoURL
              }
            ]
          });
        } else if (change.type === "removed") {
          this.setState({
            staff: this.state.staff.filter(staff => staff.uid !== change.doc.uid)
          });
        }
      });
    });
  }

  render() {
    const { staff } = this.state;
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          {staff &&
            staff.map(item => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={2} key={item.uid}>
                  <StaffCard staff={item} />
                </Grid>
              );
            })}
          {!staff.length && (
            <SVG src="../../../../assets/svg/ripple-lg.svg" alt="loader" />
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

export default Staff;

const SVG = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
