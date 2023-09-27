import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes, deleteObject, listAll } from "firebase/storage";

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
const storage = getStorage(app);

//----------------------------------------

//MÉTODOS DO STORAGE

export async function uploadFileAndGetUrl(folderDB:string, fileName: string, fileObject: File) {
  const fileRef = storageRef(storage, `${folderDB}/${fileName}`);
  return uploadBytes(fileRef, fileObject).then(async (snapshot) => {
    const url = await getDownloadURL(storageRef(storage, snapshot.metadata.fullPath));
    return url;
  });
}

export function removePhotoFromDB(folderDB: string, fileName: string) {
  const fileRef = storageRef(storage, `${folderDB}/${fileName}`);
  deleteObject(fileRef).then(() => {
    window.location.reload();
  }).catch(err => {
    alert(`Não foi possível remover o arquivo no Banco de Dados, devido ao erro: ${err}`)
  })
}

export function listAllFiles(folderDB:string, setState:React.Dispatch<React.SetStateAction<FileObjectStorage[]>>) {
  const fileRef = storageRef(storage, `${folderDB}`);
  listAll(fileRef).then((snapshot) => {
    snapshot.items.map(async (file) => {
      const url = await getDownloadURL(storageRef(storage, file.fullPath));
      setState((current) => [
        ...current,
        {
          name: file.name,
          folder: folderDB,
          url: url
        }
      ])
    })
  });
}

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
    // confirm(`Os seguinte campos foram atualizados: ${path}.`) && 
    window.location.reload();

  }).catch(err => console.log(err));
}