import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyD1PEAtplhx03HVG0EB-ai1LVtaEjBQwsg',
  authDomain: 'signupfirebase-47603.firebaseapp.com',
  projectId: 'signupfirebase-47603',
  storageBucket: 'signupfirebase-47603.appspot.com',
  messagingSenderId: '46225698213',
  appId: '1:46225698213:web:45706b3ca8caa88ae6cc4c',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { auth };
export default db;
