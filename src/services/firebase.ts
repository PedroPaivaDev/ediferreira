import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, update } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVChL0MrJQKJhwx8r5QheC36OQY4GdRGE",
  authDomain: "db-ediferreira.firebaseapp.com",
  databaseURL: "https://db-ediferreira-default-rtdb.firebaseio.com",
  projectId: "db-ediferreira",
  storageBucket: "db-ediferreira.appspot.com",
  messagingSenderId: "288048687047",
  appId: "1:288048687047:web:88731d0e41e4ac072c5be2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);
export const auth = getAuth(app);

//----------------------------------------

//MÉTODOS DO REALTIME DATABASE:

export function getData<Type>(path:string, setState:React.Dispatch<React.SetStateAction<Type>>) {
  const getRef = ref(db, path);
  onValue(
    getRef,
    (snapshot) => setState(snapshot.val()),
    {onlyOnce: true}
  )
}

export function changeContent(path:string, content:ObjectKeyString) {
  const contentRef = ref(db, `content/${path}`);
  update(contentRef, content).then(() => {
    confirm(`Os seguinte campos foram atualizados: ${path}.`) && window.location.reload();

  }).catch(err => console.log(err));
}