"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userCreated = exports.helloWorld = void 0;

var functions = _interopRequireWildcard(require("firebase-functions"));

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

_firebaseAdmin.default.initializeApp();

var db = _firebaseAdmin.default.firestore();

var helloWorld = functions.https.onRequest(function (request, response) {
  response.send('Hello from Firebase2!');
});
exports.helloWorld = helloWorld;
var userCreated = functions.auth.user().onCreate(function (user) {
  console.log(user);
  db.collection('users').add({
    email: user.email,
    displayName: user.displayName,
    uid: user.uid,
    photoURL: user.photoURL,
    provider: user.providerData[0].providerId
  }).catch(function (error) {
    throw error;
  });
});
exports.userCreated = userCreated;