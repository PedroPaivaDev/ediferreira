import { removePhotoFromDB } from "@/services/firebase";

export default function handleDeleteFile(folder:FolderFileStorage, photoObject:FileObjectStorage, contentDB:ContentDB) {
  if(contentDB?.home[folder] !== photoObject.url) {
    confirm('Deseja excluir esta foto?') &&
    removePhotoFromDB(photoObject.folder, photoObject.name);
  } else {
    alert('Você não pode excluir uma foto que esteja sendo utilizada.')
    return
  }
}