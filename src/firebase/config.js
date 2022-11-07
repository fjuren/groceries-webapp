import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyABxdxLVMoELykxF803q6lZANXkQs5Vgow',
  authDomain: 'grocerfy-eca72.firebaseapp.com',
  projectId: 'grocerfy-eca72',
  storageBucket: 'grocerfy-eca72.appspot.com',
  messagingSenderId: '1023175422466',
  appId: '1:1023175422466:web:b1600b32971749fa6f2d1b',
  measurementId: 'G-YY0D55E5KD'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { auth, db };
