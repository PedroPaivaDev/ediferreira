interface ContentDB {
  home: HomeDB;
  projects: ProjectsDB;
  contacts: ContactsDB;
  services: ServicesDB;
}

interface HomeDB {
  bgVideo: string;
  photoEdi: string;
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
}

type PostsArray = PostImageDescription[]

interface PostImageDescription {
  id: number;
  description: string;
  imageUrl: string;
  href: string;
}