import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase2!');
});

export const userCreated = functions.auth.user().onCreate(user => {
  console.log(user);
  db.collection('users')
    .add({
      email: user.email,
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      provider: user.providerData[0].providerId,
    })
    .catch(error => {
      throw error;
    });
});
