interface ContentDB {
  home: HomeDB;
  projects: ProjectsDB;
  contacts: ContactsDB;
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
  name: string;
  mainPhoto: string;
  images: string[];
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

type PostsArray = PostImageDescription[]

interface PostImageDescription {
  id: number;
  description: string;
  imageUrl: string;
  href: string;
}