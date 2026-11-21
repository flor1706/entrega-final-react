import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB55K7ZvNRAFUgrMXQOSQtsQm07UTvfA8s",
  authDomain: "tech-store-react-c2ad5.firebaseapp.com",
  projectId: "tech-store-react-c2ad5",
  storageBucket: "tech-store-react-c2ad5.firebasestorage.app",
  messagingSenderId: "496510776750",
  appId: "1:496510776750:web:fefb056bbc279b6598843f",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);