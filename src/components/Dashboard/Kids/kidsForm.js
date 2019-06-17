import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "../../../utils/firebase";
import LinearProgress from "@material-ui/core/LinearProgress";
import FileUploader from "react-firebase-file-uploader";
import KidsCard from "./kidsCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  dFlexRow: {
    display: "flex",
    flexDirection: "row"
  },
  flex1: {
    flex: 1
  }
}));

export default function({ open, onClose }) {
  const [isUploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const db = firebase.firestore();

  const save = () => {
    db.collection("kids")
      .add({
        fullName: fullName,
        nickName: nickName,
        age: age,
        bio: bio,
        image: avatar
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        onClose();
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  const handleUploadStart = () => {
    setUploading(true);
    setProgress(0);
  };
  const handleProgress = progress => setProgress(progress);
  const handleUploadError = error => {
    setUploading(false);
    console.error(error);
  };

  const handleUploadSuccess = filename => {
    setProgress(100);
    setUploading(false);
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        setAvatar(url);
      });
  };
  const classes = useStyles();

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <div className={classes.dFlexRow}>
          <section className={classes.flex1}>
            <KidsCard
              kid={{ fullName, nickName, age, bio, image: avatar }}
              preview
            />
          </section>
          <section className={classes.flex1}>
            <DialogTitle id="form-dialog-title">Add Kid</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Full Name"
                type="text"
                fullWidth
                onChange={event => setFullName(event.target.value)}
              />
              <TextField
                margin="dense"
                label="Nick Name"
                type="text"
                fullWidth
                onChange={event => setNickName(event.target.value)}
              />
              <TextField
                margin="dense"
                id="age"
                label="Age"
                type="number"
                fullWidth
                onChange={event => setAge(event.target.value)}
              />
              <TextField
                margin="dense"
                id="bio"
                label="Bio"
                type="text"
                fullWidth
                onChange={event => setBio(event.target.value)}
              />
              <FileUploader
                accept="image/*"
                name="avatar"
                randomizeFilename
                storageRef={firebase.storage().ref("images")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
              {isUploading && (
                <LinearProgress variant="determinate" value={progress} />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={save} color="primary">
                Save
              </Button>
            </DialogActions>
          </section>
        </div>
      </Dialog>
    </div>
  );
}
