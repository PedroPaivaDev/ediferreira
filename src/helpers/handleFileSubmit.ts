import { changeContent, uploadFileAndGetUrl } from "@/services/firebase";
import createObjectFromEntries from "./createObjectFromEntries";

export default function handleFileSubmit(event:React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const formDataEntriesArray = Array.from(formData.entries());
  const formObjectChangedKeys = createObjectFromEntries(formDataEntriesArray as Array<[string, string]>);
  Object.keys(formObjectChangedKeys).forEach(path =>
    Object.keys(formObjectChangedKeys[path]).forEach(key => {
      const objectFile = formObjectChangedKeys[path][key];
      uploadFileAndGetUrl(key, objectFile.name, objectFile as File).then(fileUrl =>
        changeContent(path, {[key]: fileUrl})
      )
    })
  );
}