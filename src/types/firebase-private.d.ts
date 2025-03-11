interface CustomerEbookDB {
  downloadDate: string;
  ebookLink: string;
}

interface RegistrationDB {
  email: string;
  name: string;
  phone?: string;
  city?: string;
  openChatDate?: string | null;
  ebooks: CustomerEbookDB | null;
  id: string;
}

interface RegistrationsDB {
  [key: string]: RegistrationDB;
}

interface PrivateDB {
  registrations: RegistrationsDB;
}
