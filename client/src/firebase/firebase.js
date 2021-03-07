import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "visite-place-tracker.firebaseapp.com",
  projectId: "visite-place-tracker",
  storageBucket: "visite-place-tracker.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASURE_ID,
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
export const firestore = firebase.firestore();
const storage = firebaseApp.storage();

export const uploadImage = async(uid, file)=> {
  const id = uid;
  const uploadTask = storage.ref(`images/${file.name}-${id}`).put(file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => console.log("image uploading", snapshot),
      reject,
      () => {
        storage
          .ref("images")
          .child(`${file.name}-${id}`)
          .getDownloadURL()
          .then(resolve);
      }
    );
  });
}

