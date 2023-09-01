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
  [key:string]: {
    id: string;
    mainPhoto: string;
    slide: string[];
  }
}