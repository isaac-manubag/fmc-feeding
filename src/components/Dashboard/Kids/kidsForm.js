import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from '../../../utils/firebase';
import LinearProgress from '@material-ui/core/LinearProgress';
import FileUploader from "react-firebase-file-uploader";

export default function ({ open, onClose }) {
    const [isUploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [avatar, setAvatar] = useState('');
    const fullName = React.createRef();
    const nickName = React.createRef();
    const age = React.createRef();
    const bio = React.createRef();
    const db = firebase.firestore();

    const save = () => {
        console.log('sac')
        console.log('fullNameREf', fullName.current.value)

        db.collection('kids')
            .add({
                fullName: fullName.current.value,
                nickName: nickName.current.value,
                age: age.current.value,
                bio: bio.current.value,
                image: avatar,
            })
            .then(function (docRef) {
                console.log('Document written with ID: ', docRef.id);
                onClose();
            })
            .catch(function (error) {
                console.error('Error adding document: ', error);
            });
    }

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

        console.table({
            isUploading,
            progress,
            avatar
        })

        firebase
          .storage()
          .ref("images")
          .child(filename)
          .getDownloadURL()
          .then(url => {
            setAvatar(url);

          });
      };
    
    

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Kid</DialogTitle>
                <DialogContent>
                    <TextField
                        inputRef={fullName}
                        autoFocus
                        margin="dense"
                        label="Full Name"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        inputRef={nickName}
                        autoFocus
                        margin="dense"
                        label="Nick Name"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        inputRef={age}
                        autoFocus
                        margin="dense"
                        id="age"
                        label="Age"
                        type="number"
                        fullWidth
                    />
                    <TextField
                        inputRef={bio}
                        autoFocus
                        margin="dense"
                        id="bio"
                        label="Bio"
                        type="text"
                        fullWidth
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
                    {isUploading && <LinearProgress variant="determinate" value={progress} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={save} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}