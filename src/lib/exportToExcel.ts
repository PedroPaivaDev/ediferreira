import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ebooks?: {
    downloadDate?: string;
    ebookLink?: string;
  };
  openChatDate?: string;
}

export default function exportToExcel(data: Record<string, UserData>) {
  // Converter objeto JSON em array de objetos
  const formattedData = Object.values(data).map((user) => ({
    ID: user.id,
    Nome: user.name,
    Email: user.email,
    Telefone: user.phone,
    Cidade: user.city,
    "Data de Download": user.ebooks?.downloadDate || "",
    "Link do Ebook": user.ebooks?.ebookLink || "",
    "Data de Abertura do Chat": user.openChatDate || "",
  }));

  // Criar um novo livro de trabalho e uma planilha
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Adicionar a planilha ao livro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Usuários");

  // Criar arquivo Excel e fazer o download
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(dataBlob, "usuarios.xlsx");
};
