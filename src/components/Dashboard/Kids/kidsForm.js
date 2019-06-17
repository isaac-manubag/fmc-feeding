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
import FormHelperText from "@material-ui/core/FormHelperText";
import { Formik } from "formik";

const useStyles = makeStyles(theme => ({
  dFlexRow: {
    display: "flex",
    flexDirection: "row"
  },
  flex1: {
    flex: 1
  }
}));

const db = firebase.firestore();

export default function({ open, onClose }) {
  const classes = useStyles();
  const [isUploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [kidProfile, setKidProfile] = useState({
    image: "",
    fullName: "",
    nickName: "",
    age: "",
    bio: ""
  });

  const close = () => {
    setUploading(false);
    setProgress(0);
    setKidProfile({
      image: "",
      fullName: "",
      nickName: "",
      age: "",
      bio: ""
    });

    onClose();
  };

  const handleUploadStart = () => {
    setUploading(true);
    setProgress(0);
  };

  const handleProgress = progress => setProgress(progress);

  const handleUploadError = error => {
    setUploading(false);
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
        setKidProfile({
          ...kidProfile,
          image: url
        });
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <div className={classes.dFlexRow}>
          <section className={classes.flex1}>
            <KidsCard kid={kidProfile} preview />
          </section>
          <Formik
            initialValues={{
              fullName: "",
              nickName: "",
              age: ""
            }}
            validate={values => {
              let errors = {};
              if (!values.fullName) {
                errors.fullName = "Fullname is required";
              }
              if (!values.nickName) {
                errors.nickName = "Nickname is required";
              }
              if (!values.age) {
                errors.age = "Age is required";
              }

              setKidProfile({
                ...kidProfile,
                fullName: values.fullName,
                nickName: values.nickName,
                age: values.age,
                bio: values.bio
              });
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              db.collection("kids")
                .add({
                  fullName: values.fullName,
                  nickName: values.nickName,
                  age: values.age,
                  bio: values.bio,
                  image: kidProfile.image
                })
                .then(function(docRef) {
                  console.log("Document written with ID: ", docRef.id);
                  close();
                  setSubmitting(false);
                })
                .catch(function(error) {
                  setSubmitting(false);
                });
            }}
          >
            {({
              errors,
              touched,
              handleSubmit,
              handleChange,
              isSubmitting
            }) => (
              <section className={classes.flex1}>
                <DialogTitle id="form-dialog-title">Add Kid</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Full Name"
                    type="text"
                    fullWidth
                    name="fullName"
                    required
                    onChange={handleChange}
                  />
                  {errors.fullName && touched.fullName && (
                    <FormHelperText color="secondary">
                      {errors.fullName}
                    </FormHelperText>
                  )}
                  <TextField
                    margin="dense"
                    label="Nick Name"
                    type="text"
                    fullWidth
                    name="nickName"
                    required
                    onChange={handleChange}
                  />
                  {errors.nickName && touched.nickName && (
                    <FormHelperText color="secondary">
                      {errors.nickName}
                    </FormHelperText>
                  )}
                  <TextField
                    margin="dense"
                    id="age"
                    label="Age"
                    type="number"
                    fullWidth
                    name="age"
                    required
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    id="bio"
                    label="Bio"
                    type="text"
                    fullWidth
                    required
                    onChange={handleChange}
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
                {!isSubmitting && (
                  <DialogActions>
                    <Button onClick={close} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                      Save
                    </Button>
                  </DialogActions>
                )}
              </section>
            )}
          </Formik>
        </div>
      </Dialog>
    </div>
  );
}
