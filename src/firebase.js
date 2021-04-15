import firebase from 'firebase'

import 'firebase/messaging' 

export const onMessageListener = () =>
  new Promise((resolve) => {
    firebase.messaging.onMessage((payload) => {
      resolve(payload);
    });
});
const config={
    apiKey: "AIzaSyDq5qYahCvucliWw6e-T4UIeILvD1NIz_8",
    authDomain: "samtv-7b912.firebaseapp.com",
    projectId: "samtv-7b912",
    storageBucket: "samtv-7b912.appspot.com",
    messagingSenderId: "229942515029",
    appId: "1:229942515029:web:67c956edc718b74baecbdc"

}

firebase.initializeApp(config)

export default firebase;