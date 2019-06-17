'use strict';

/*eslint-disable*/

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.userCreated = exports.helloWorld = void 0;

var _firebaseFunctions = _interopRequireDefault(require('firebase-functions'));

var _firebase = _interopRequireDefault(require('./utils/firebase'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var db = _firebase.default.firestore();

var helloWorld = _firebaseFunctions.default.https.onRequest(function(
  request,
  response,
) {
  response.send('Hello from Firebase2!');
});

exports.helloWorld = helloWorld;

var userCreated = _firebaseFunctions.default.auth
  .user()
  .onCreate(function(user) {
    console.log(user);
    db.collection('users')
      .add({
        email: user.email,
        displayName: user.displayName,
      })
      .then(function(docRef) {
        console.log('Document : ', docRef);
        return;
      })
      .catch(function(error) {
        throw error;
      });
  });

exports.userCreated = userCreated;
