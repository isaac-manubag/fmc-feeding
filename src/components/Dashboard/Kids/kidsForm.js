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
import DialogContentText from '@material-ui/core/DialogContentText';
import { Formik } from "formik";
import "firebase/firestore";

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

export default function({ open, onClose, deleting, updating }) {
  const classes = useStyles();
  const [isUploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [kidProfile, setKidProfile] = useState({
    image: "",
    fullName: "",
    nickName: "",
    dob: "",
    bio: ""
  });

  // this is not good practice lol
  if (deleting) {
    kidProfile.image = deleting.image;
    kidProfile.fullName = deleting.fullName;
    kidProfile.nickName = deleting.nickName;
    kidProfile.dob = deleting.dob;
    kidProfile.bio = deleting.bio;
  }

  // this is not good practice lol
  if (updating) {
    kidProfile.image = updating.image;
    kidProfile.fullName = updating.fullName;
    kidProfile.nickName = updating.nickName;
    kidProfile.dob = updating.dob;
    kidProfile.bio = updating.bio;
  }

  const close = () => {
    setUploading(false);
    setProgress(0);
    setKidProfile({
      image: "",
      fullName: "",
      nickName: "",
      dob: "",
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

  const renderContent = () => {
    if (deleting) {
      return (
        <section className={classes.flex1}>
          <DialogTitle id="alert-dialog-title">
            {"Do you want to delete this record?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once you have deleted this record you will not be able to access it's details anymore.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={close} color="primary">
              Disagree
            </Button>
            <Button
              onClick={() => {
                db.collection("kids")
                  .doc(deleting.id)
                  .delete();

                close();
              }}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </section>
      );
    }

    return (
      <Formik
        initialValues={{
          fullName: "",
          nickName: "",
          dob: "",
          bio: "",
        }}
        validate={values => {
          let errors = {};
          if (!values.fullName) {
            errors.fullName = "Fullname is required";
          }
          if (!values.nickName) {
            errors.nickName = "Nickname is required";
          }
          if (!values.dob) {
            errors.dob = "DOB is required";
          }

          setKidProfile({
            ...kidProfile,
            fullName: values.fullName,
            nickName: values.nickName,
            dob: values.dob,
            bio: values.bio
          });
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log('sac1')
          if (updating) {
            console.log('sac12')
            db.collection('kids')
              .doc(updating.id)
              .update({
                fullName: values.fullName,
                nickName: values.nickName,
                dob: values.dob,
                bio: values.bio,
                image: kidProfile.image
              })
              .then(function(docRef) {
                close();
                setSubmitting(false);
              })
              .catch(function(error) {
                setSubmitting(false);
              });
          } else {
            db.collection("kids")
            .add({
              fullName: values.fullName,
              nickName: values.nickName,
              dob: values.dob,
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
          }
          
        }}
      >
        {({ errors, touched, handleSubmit, handleChange, isSubmitting }) => (
          <section className={classes.flex1}>
            <DialogTitle id="form-dialog-title">{updating ? "Update" : "Add"} Kid</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Fullname"
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
                label="Nickname"
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
                id="dob"
                label="Date Of Birth"
                type="date"
                fullWidth
                name="dob"
                required
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors.dob && touched.dob && (
                <FormHelperText color="secondary">
                  {errors.dob}
                </FormHelperText>
              )}
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
            <DialogActions>
              <Button onClick={close} color="secondary">
                Cancel
              </Button>
              {!isSubmitting && (
                <Button onClick={handleSubmit} color="primary">
                  Save
                </Button>
              )}
            </DialogActions>
          </section>
        )}
      </Formik>
    );
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <div className={classes.dFlexRow}>
          <section className={classes.flex1}>
            <KidsCard kid={kidProfile} preview />
          </section>

          {renderContent()}
        </div>
      </Dialog>
    </div>
  );
}
