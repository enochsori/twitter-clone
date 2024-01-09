import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAmOahF7Lo9Xv7-eSO6rChoAGxmaQEDPPI',
  authDomain: 'twitter-clone-dc035.firebaseapp.com',
  projectId: 'twitter-clone-dc035',
  storageBucket: 'twitter-clone-dc035.appspot.com',
  messagingSenderId: '719985644948',
  appId: '1:719985644948:web:6cf84778809b1762182b81',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
