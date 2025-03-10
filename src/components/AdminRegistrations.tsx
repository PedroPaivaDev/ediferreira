import React from 'react';

import exportToExcel from '@/lib/exportToExcel';
import { getRegistrationsDB } from '@/services/firebase';

import Button from './Button';

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

const AdminRegistrations = () => {
  const [registrationsDB, setRegistrationsDB] = React.useState<RegistrationsDB | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/\D/g, "").replace(/^(.{2})(.+)$/, "55$1$2");
  }

  const filteredRegistrations = registrationsDB
    ? Object.entries(registrationsDB).filter(([_, registration]) => {
      const search = searchTerm.toLowerCase();
      return (
        registration.name?.toLowerCase().includes(search) ||
        registration.email?.toLowerCase().includes(search) ||
        registration.phone?.toLowerCase().includes(search) ||
        registration.city?.toLowerCase().includes(search)
      );
    })
    : [];

  React.useEffect(() => {
    getRegistrationsDB().then((data) => {
      setRegistrationsDB(data);
    });
  }, []);

  const mapRegistrationToUserData = (registration: RegistrationDB): UserData => {
    return {
      id: registration.id,
      name: registration.name,
      email: registration.email,
      phone: registration.phone,
      city: registration.city,
      ebooks: registration.ebooks
        ? {
          downloadDate: registration.ebooks.downloadDate,
          ebookLink: registration.ebooks.ebookLink,
        }
        : undefined,
      openChatDate: registration.openChatDate || undefined,
    };
  };

  function handleDownloadCompleteData() {
    if(!registrationsDB) {
      alert("Não há dados para serem baixados")
      return
    }
    const mappedData = Object.fromEntries(
      Object.entries(registrationsDB).map(([key, registration]) => [
        key,
        mapRegistrationToUserData(registration),
      ])
    );
    exportToExcel(mappedData);
  }

  function handleDownloadFilteredData() {
    const mappedData = Object.fromEntries(
      filteredRegistrations.map(([key, registration]) => [
        key,
        mapRegistrationToUserData(registration),
      ])
    );
    exportToExcel(mappedData);
  }

  return (
    <div className="w-full flex flex-col justify-start items-start gap-3 text-left">
      <h3 className="text-mood-tertiary">Registros dos formulários de Whatsapp e Ebooks</h3>

      {registrationsDB && (
        <Button label='Baixar Dados Completos' onClick={handleDownloadCompleteData}/>
      )}

      {filteredRegistrations.length > 0 && (
        <Button label='Baixar Dados Filtrados' onClick={handleDownloadFilteredData}/>
      )}

      <input
        type="text"
        placeholder="Filtrar por nome, email, telefone ou cidade"
        className="p-2 border rounded-md w-full sm:w-1/2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {registrationsDB ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {filteredRegistrations.length > 0 ? (
            filteredRegistrations.map(([key, registration]) => (
              <li key={key} className="border border-gray-300 p-4 rounded-lg shadow-md bg-white w-full">
                <p className="text-lg font-semibold">{registration.name}</p>
                <p>{registration.email}</p>
                <p>{registration.phone}</p>
                <p>{registration.city}</p>
                {registration.ebooks && (
                  <p className="text-sm mt-2">
                    <a
                      href={registration.ebooks.ebookLink}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ebook em:
                    </a>
                    <span> {new Date(registration.ebooks.downloadDate).toLocaleString()}</span>
                  </p>
                )}
                {registration.openChatDate && (
                  <p className="text-sm mt-2">
                    <a
                      href={`https://api.whatsapp.com/send?phone=${formatPhoneNumber(registration.phone)}`}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat em:
                    </a>{' '}
                    {new Date(registration.openChatDate).toLocaleString()}
                  </p>
                )}
              </li>
            ))
          ) : (
            <p className="text-center col-span-full">Nenhum registro encontrado.</p>
          )}
        </ul>
      ) : (
        <p className="text-center">Carregando registros...</p>
      )}
    </div>
  );
};

export default AdminRegistrations;
