import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
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

export async function uploadFileAndGetUrl(folderStoragePath:string, fileName: string, fileObject: File) {
  const fileRef = storageRef(storage, `${folderStoragePath}/${fileName}`);
  return uploadBytes(fileRef, fileObject).then(async (snapshot) => {
    const url = await getDownloadURL(storageRef(storage, snapshot.metadata.fullPath));
    return url;
  });
}

export function removePhotoFromStorage(folderStoragePath: string, fileName: string) {
  const fileRef = storageRef(storage, `${folderStoragePath}/${fileName}`);
  deleteObject(fileRef).then(() => {
    window.location.reload();
  }).catch(err => {
    alert(`Não foi possível remover o arquivo no Banco de Dados, devido ao erro: ${err}`)
  })
}

export async function listAllFiles(
  folderStoragePath:FileStoragePath,
  folderName:FileStorageFolder,
  setState:React.Dispatch<React.SetStateAction<FileObjectStorage[]>>
) {
  const fileRef = storageRef(storage, `${folderStoragePath}`);
  try {
    const snapshot = await listAll(fileRef);

    const promises = snapshot.items.map(async (file) => {
      const url = await getDownloadURL(storageRef(storage, file.fullPath));
      return {
        name: file.name,
        folder: folderName,
        url: url
      };
    });

    const arrayPhotoObjects = await Promise.all(promises);
    setState(arrayPhotoObjects);
  } catch (error) {
    console.error('Error listing files:', error);
  }
}

export async function deleteProject(projectId:string) {
  //até o dia 02 de outubro de 2023, o Firebase não permite remover pastas do Storage, então as imagens do projeto serão removidas, mas não a sua pasta.
  try {
    const storageFolderRef = storageRef(storage, `projetos/${projectId}`);
    const storageFiles = await listAll(storageFolderRef);
    const deletePromises = storageFiles.items.map(item => deleteObject(item));

    await Promise.all(deletePromises);

    const getRef = ref(db, `content/projects/${projectId}`);
    await remove(getRef);

    window.location.reload();
  } catch (error) {
    console.error('Erro ao excluir o projeto:', error);
  }
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