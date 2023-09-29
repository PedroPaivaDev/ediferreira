interface ContentDB {
  home: HomeDB;
  projects: ProjectsDB;
  contacts: ContactsDB;
  services: ServicesDB;
  about: AboutDB;
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
  [key:string]: ProjectDB;
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
  [key:string]: ContactDB;
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
    [key:string]: string;
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
  [key:string]: string;
}

interface FormObjectKeyString {
  [key: string]: {
    [key: string]: string | Array;
  }
}

type LogoType = 'default' | 'circle' | 'name' | 'closed';

interface FileObjectStorage {
  name: string;
  url: string;
  folder: FolderFileStorage;
}

type FolderFileStorage = 'bgPhoto'|'photoEdi'|'bgVideo';