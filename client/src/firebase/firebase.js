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
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export const uploadImage = async (uid, file) => {
  const unixTimeStamp = Date.now();
  const id = uid;
  const uploadTask = storage
    .ref(`images/${file.name}-${unixTimeStamp}-${id}`)
    .put(file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => console.log("image uploading", snapshot),
      reject,
      () => {
        storage
          .ref("images")
          .child(`${file.name}-${unixTimeStamp}-${id}`)
          .getDownloadURL()
          .then(resolve);
      }
    );
  });
};
export const imageDeleteHandler = (url) => {
  let imageRef = storage.refFromURL(url);
  imageRef
    .delete()
    .then(() => {})
    .catch((err) => {});
};

export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
};
export const logOut = async () => {
  await auth.signOut();
};
