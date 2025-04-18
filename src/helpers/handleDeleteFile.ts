import { changeContent, removeFileFromStorage } from "@/services/firebase";

export default function handleDeleteFile(
  photoBeingUsedUrlDB:string,
  fileStoragePath:FileStoragePath,
  photoObject:FileObjectStorage,
  pathPhotoUsedOnDB: UsePhotoOnPathDB,
  projectPhotosDB?:string[]
) {
  if(!photoBeingUsedUrlDB.includes(photoObject.url)) {
    if(confirm('Deseja excluir esta foto?')) {
      removeFileFromStorage(fileStoragePath, photoObject.name);
      projectPhotosDB && changeContent(pathPhotoUsedOnDB, {images: projectPhotosDB.filter(photoUrl => photoUrl!==photoObject.url)});
    } else return;
  } else {
    alert('Você não pode excluir uma foto que esteja sendo utilizada.')
    return
  }
}