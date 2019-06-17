import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import KidsCard from "./kidsCard";
import KidsForm from "./kidsForm";
import FAB from "./fab";
import firebase from "../../../utils/firebase";
import "firebase/firestore";

const db = firebase.firestore();

class Kids extends React.Component {
  state = {
    kids: [],
    formOpen: false,
    deleting: false
  };

  componentDidMount() {
    db.collection("kids").onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          this.setState({
            kids: [
              ...this.state.kids,
              {
                fullName: change.doc.data().fullName,
                nickName: change.doc.data().nickName,
                age: change.doc.data().age,
                bio: change.doc.data().bio,
                image: change.doc.data().image,
                id: change.doc.id
              }
            ]
          });
        } else if (change.type === "removed") {
          this.setState({
            kids: this.state.kids.filter(kid => kid.id !== change.doc.id)
          });
        }
      });
    });
  }

  addKid = () => {
    this.openModal();
    return;
  };

  deleteKid = documentID => {
    this.setState({
      formOpen: true,
      deleting: documentID
    });
  };

  closeModal = () => {
    this.setState({
      formOpen: false,
      deleting: false
    });
  };

  openModal = () => {
    this.setState({
      formOpen: true,
      deleting: false
    });
  };

  render() {
    const { kids, deleting } = this.state;
    console.log("sac");
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          {kids &&
            kids.map(item => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={2} key={item.id}>
                  <KidsCard kid={item} deleteKid={this.deleteKid} />
                </Grid>
              );
            })}
          {!kids.length && (
            <SVG src="../../../../assets/svg/ripple-lg.svg" alt="loader" />
          )}
        </Grid>
        <KidsForm
          open={this.state.formOpen}
          onClose={this.closeModal}
          deleting={deleting}
        />
        <FAB add={this.addKid} />
      </React.Fragment>
    );
  }
}

export default Kids;

const SVG = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
