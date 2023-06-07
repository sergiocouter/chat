import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0w08siaXbXaaMRz3xJoJXo3yhTLhcK2s",
  authDomain: "chat-a05bc.firebaseapp.com",
  projectId: "chat-a05bc",
  storageBucket: "chat-a05bc.appspot.com",
  messagingSenderId: "568352535712",
  appId: "1:568352535712:web:d81653fa61473de16505c5",
  measurementId: "G-8RTCP50DBQ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dataBaseApp = getFirestore(app);