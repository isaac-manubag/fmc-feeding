import React from 'react';
import Grid from '@material-ui/core/Grid';
import KidsCard from './kidsCard';
import KidsForm from './kidsForm';
import FAB from './fab';
import firebase from '../../../utils/firebase';
import 'firebase/firestore';

const db = firebase.firestore();

class Kids extends React.Component {
    state = {
        kids: [],
        formOpen: false
    };
    

    componentDidMount() {
        db.collection("kids")
            .onSnapshot(snapshot => {
                const changes = snapshot.docChanges();
                console.log('changes', changes)
                changes.forEach(change => {
                    if (change.type === 'added') {
                        this.setState({
                            kids: [
                                ...this.state.kids,
                                {
                                    fullName: change.doc.data().fullName,
                                    nickName: change.doc.data().nickName,
                                    age: change.doc.data().age,
                                    bio: change.doc.data().bio,
                                    image: change.doc.data().image,
                                    id: change.doc.id,
                                }
                            ],
                        });
                    } else if (change.type === 'removed') {
                        this.setState({
                            kids: this.state.kids.filter((kid) => kid.id !== change.doc.id),
                        });
                    }
                })

            });
    }

    addKid = () => {
        this.openModal(); return;
    };

    deleteKid = (documentID) => {
        db.collection("kids").doc(documentID).delete();
    };

    closeModal = () => {
        this.setState({
            formOpen: false
        })
    }

    openModal = () => {
        this.setState({
            formOpen: true
        })
    }

    render() {
        const { kids } = this.state;

        return (
            <>
                <Grid container spacing={3}>
                    {kids &&
                        kids.map(item => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={2} key={item.id}>
                                    <KidsCard kid={item} deleteKid={this.deleteKid} />
                                </Grid>
                            );
                        })}
                    {!kids.length && <p>loading</p>}
                </Grid>
                <KidsForm open={this.state.formOpen} onClose={this.closeModal} />
                <FAB add={this.addKid} />
            </>
        );
    }
}

export default Kids;
