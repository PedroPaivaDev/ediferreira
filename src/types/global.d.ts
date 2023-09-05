interface ContentDB {
  home: HomeDB;
  projects: ProjectsDB;
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