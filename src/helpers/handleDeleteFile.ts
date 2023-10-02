import { changeContent, removePhotoFromStorage } from "@/services/firebase";

export default function handleDeleteFile(
  photoBeingUsedUrlDB:string,
  fileStoragePath:FileStoragePath,
  photoObject:FileObjectStorage,
  pathPhotoUsedOnDB: UsePhotoOnPathDB,
  projectPhotosDB?:string[]
) {
  if(photoBeingUsedUrlDB !== photoObject.url) {
    if(confirm('Deseja excluir esta foto?')) {
      removePhotoFromStorage(fileStoragePath, photoObject.name);
      projectPhotosDB && changeContent(pathPhotoUsedOnDB, {images: projectPhotosDB.filter(photoUrl => photoUrl!==photoObject.url)});
    } else return;
  } else {
    alert('Você não pode excluir uma foto que esteja sendo utilizada.')
    return
  }
}