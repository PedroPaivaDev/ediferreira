import { changeContent } from "@/services/firebase";

export default function handleSelectedFile(path:string, folder:string, url:string) {
  confirm('Deseja usar este arquivo?') &&
  changeContent(path, {[folder]: url})
}