interface ContentDB {
  home: HomeDB;
  projects: ProjectsDB;
  contacts: ContactsDB;
  services: ServicesDB;
  about: AboutDB;
  guides: Guides;
}

interface HomeDB {
  bgVideo: string;
  bgPhoto: string;
  photoEdi: string;
  callProjects: string;
  callAbout: string;
}

interface AboutDB {
  text: string;
  projectsText: {
    subtitle: string;
    description: string;
  },
  servicesText: {
    firstParagraph: string;
    secondParagraph: string;
    thirdParagraph: string;
  }
}

interface ProjectsDB {
  [key: string]: ProjectDB;
}

interface ProjectDB {
  id: string;
  mainPhoto: string;
  images: string[];
  name: string;
  subtitle: string;
  description: string;
}

interface ContactsDB {
  description: string;
  social: ContactsSocialDB;
}

interface ContactsSocialDB {
  [key: string]: ContactDB;
}

interface ContactDB {
  id: string;
  name: string;
  icon: string;
  address: string;
  url: string;
}

interface ServicesDB {
  [key: string]: ServiceTypeDB;
}

interface ServiceTypeDB {
  id: string;
  subtitle: string;
  items: string[];
  products: {
    [key: string]: string;
  }
}

type PostsArray = PostImageDescription[]

interface PostImageDescription {
  id: number;
  description: string;
  imageUrl: string;
  href: string;
}

interface ObjectKeyString {
  [key: string]: string | string[];
}

interface FormObjectKeyString {
  [key: string]: {
    [key: string]: string | Array;
  }
}

type LogoType = 'default' | 'circle' | 'name' | 'closeSandwich' | 'openSandwich';

interface FileObjectStorage {
  name: string;
  url: string;
  folder: FileStorageFolder;
  size: number;
}

interface FileObjectLocal {
  file: File;
  name: string;
  url: string;
  size: number;
}

type FileStorageFolder = 'bgPhoto' | 'bgVideo' | 'photoEdi' | 'mainPhoto' | 'guides'

type FileStoragePath = 'bgPhoto' | 'bgVideo' | 'photoEdi' | `projetos/${string}` | 'ebooks/guides';

type UsePhotoOnPathDB = 'home' | `projects/${string}`;

interface ContactFormData {
  'nome completo': string;
  'e-mail': string;
  whatsapp: string;
  cidade: string;
}

interface Ebook {
  description: string;
  downloadLink: string;
  id: string;
  name: string;
  downloadButtonText: string;
}

interface Ebooks {
  [key: string]: Ebook;
}

interface Guides {
  title: string;
  subtitle: string;
  isVisible: boolean;
  ebooks: Ebooks;
}