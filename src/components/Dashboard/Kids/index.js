import React from 'react';
import Grid from '@material-ui/core/Grid';
import KidsCard from './kidsCard';
import FAB from './fab';
import firebase from '../../../utils/firebase';
import 'firebase/firestore';

const db = firebase.firestore();

const addKid = () => {
  db.collection('kids')
    .add({
      fullName: 'Enmanuel Miranda Espino',
      nickName: 'Pino',
      age: 12,
      bio:
        'Reader. Award-winning coffee geek. Social media junkie. Creator. Unapologetic twitter expert.',
    })
    .then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
};

class Kids extends React.Component {
  state = {
    kids: [],
  };

  componentDidMount() {
    db.collection('kids')
      .get()
      .then(querySnapshot => {
        const kids = [];
        querySnapshot.forEach(doc => {
          kids.push({
            fullName: doc.data().fullName,
            nickName: doc.data().nickName,
            age: doc.data().age,
            bio: doc.data().bio,
            image: doc.data().image,
            id: doc.id,
          });
        });

        this.setState({
          kids,
        });
      });
  }

  render() {
    const { kids } = this.state;

    return (
      <>
        <Grid container spacing={3}>
          {kids &&
            kids.map(item => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <KidsCard kid={item} />
                </Grid>
              );
            })}
          {!kids.length && <p>loading</p>}
        </Grid>
        <FAB add={addKid} />
      </>
    );
  }
}

export default Kids;
