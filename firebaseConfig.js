import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAy1_g4i7KSdy7b34z6UeMLczmvwHaCPmY",
  authDomain: "flash-chat-b0dcb.firebaseapp.com",
  projectId: "flash-chat-b0dcb",
  storageBucket: "flash-chat-b0dcb.appspot.com",
  messagingSenderId: "24228402241",
  appId: "1:24228402241:web:a51657f672bbf74f97e2c0",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default auth;
