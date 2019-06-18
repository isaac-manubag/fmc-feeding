"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var firebase = _interopRequireWildcard(require("firebase"));

require("@firebase/firestore");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var config = {
  apiKey: 'AIzaSyDPUL_kqpWE01g83wk2yK_ZvAXbTuClrU8',
  authDomain: 'fmc-cebu-feeding.firebaseapp.com',
  projectId: 'fmc-cebu-feeding',
  storageBucket: 'gs://fmc-cebu-feeding.appspot.com/'
};

var _default = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

exports.default = _default;