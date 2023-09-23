import { changeContent } from "@/services/firebase";
import createObjectFromEntries from "./createObjectFromEntries";

export default function handleTextSubmit(event:React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const formDataEntriesArray = Array.from(formData.entries());
  const formObjectChangedKeys = createObjectFromEntries(formDataEntriesArray as Array<[string, string]>);
  if(Object.keys(Object.keys(formObjectChangedKeys).length===0)) {
    alert('Nenhum campo foi alterado.');
    return
  }
  Object.keys(formObjectChangedKeys).forEach(path =>
    Object.keys(formObjectChangedKeys[path]).forEach(key =>
      changeContent(path, {[key]: formObjectChangedKeys[path][key]})
    )
  );
}