import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from '../../../utils/firebase';

export default function ({ open, onClose }) {
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
            })
            .then(function (docRef) {
                console.log('Document written with ID: ', docRef.id);
                onClose();
            })
            .catch(function (error) {
                console.error('Error adding document: ', error);
            });
    }

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