import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9WcItk-V36LVq4q2xvGoYMdxKtaK0rl4",
  authDomain: "todo-list-ffd1e.firebaseapp.com",
  projectId: "todo-list-ffd1e",
  storageBucket: "todo-list-ffd1e.firebasestorage.app",
  messagingSenderId: "963106900954",
  appId: "1:963106900954:web:ab486af05296495f9ecee3",
  measurementId: "G-TKTBG74SKY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc };