import firebase from 'firebase';
import 'firebase/firestore';

const fbCred = process.env;

var firebaseConfig = {
    apiKey: fbCred.REACT_APP_FB_API_KEY,
    authDomain: fbCred.REACT_APP_FB_AUTH_DOMAIN,
    databaseURL: fbCred.REACT_APP_FB_DB_URL,
    projectId: fbCred.REACT_APP_FB_PROJ_ID,
    storageBucket: fbCred.REACT_APP_FB_STORE_BUCKET,
    messagingSenderId: fbCred.REACT_APP_FB_MESS_SEND_ID,
    appId: fbCred.REACT_APP_FB_APP_ID,
    measurementId: fbCred.REACT_APP_FB_MEASURE_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;