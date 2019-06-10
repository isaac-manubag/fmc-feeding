import * as firebase from "firebase";

const config = {
    apiKey: 'AIzaSyDPUL_kqpWE01g83wk2yK_ZvAXbTuClrU8',
    authDomain: 'fmc-cebu-feeding.firebaseapp.com',
    projectId: 'fmc-cebu-feeding',
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();