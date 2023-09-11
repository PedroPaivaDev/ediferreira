import React from 'react';
import Link from 'next/link';

import objectBgImage from '@/helpers/objectBgImage';

import SlideArrows from './SlideArrows';

interface PropsSlider {
  projects: ProjectsDB;
}

const Slider: React.FC<PropsSlider> = ({ projects }) => {
  const startXRef = React.useRef<number | null>(null);
  const startYRef = React.useRef<number | null>(null);
  
  const [currentProject, setCurrentProject] = React.useState<ProjectDB>(projects[Object.keys(projects)[0]]);
  const [animeDirection, setAnimeDirection] = React.useState('animeRight');

  function handleSwipe(direction:string) {
    if(Object.keys(projects).length > 1) {
      const arrayProjects = Object.keys(projects);
      const indexCurrentProj = arrayProjects.indexOf(currentProject.id);
      if(
        direction==='left' &&
        indexCurrentProj > 0
      ) {
        setAnimeDirection('animeLeft');
        setCurrentProject(projects[arrayProjects[indexCurrentProj - 1]]);
      } else if(
        direction==='right' &&
        indexCurrentProj < (arrayProjects.length - 1)
      ) {
        setAnimeDirection('animeRight');
        setCurrentProject(projects[arrayProjects[indexCurrentProj + 1]]);
      } else {
        return;
      }
    } else {
      return;
    }
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    startXRef.current = touch.clientX;
    startYRef.current = touch.clientY;
  };

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (!startXRef.current || !startYRef.current) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - startXRef.current;
    const deltaY = touch.clientY - startYRef.current;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        handleSwipe('left');
      } else {
        handleSwipe('right');
      }
    }

    startXRef.current = null;
    startYRef.current = null;
  };

  React.useEffect(() => {
    const projectsArray:string[] = Object.keys(projects);
    const currentProjectIndex:number = projectsArray.indexOf(currentProject.id);
    const timer = setInterval(() => {
      if (currentProjectIndex === projectsArray.length - 1) {
        setAnimeDirection('animeRight');
        setCurrentProject(projects[projectsArray[0]]);
      } else {
        setCurrentProject((prevProject) => {
          setAnimeDirection('animeRight');
          const prevProjectIndex:number = projectsArray.indexOf(prevProject.id) + 1;
          return projects[projectsArray[prevProjectIndex]]
        });
      }
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, [currentProject, projects]);

  return (
    <div id='slider'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className='
        w-full max-w-[900px] h-almostScreen relative shadow-lg
        flex items-end justify-center overflow-x-hidden
      '
    >
      {projects && Object.keys(projects).map(projectId =>
        <div key={projects[projectId].id}
          style={objectBgImage(projects[projectId].mainPhoto)}
          className={`
            absolute w-full h-full rounded-md
            flex flex-col justify-end items-center pb-16
            ${projectId===currentProject.id ?
              `visible ${animeDirection}` : 'invisible'
            }
            shadow-blackShadowInsetBottom
          `}
        >
          {currentProject.id===projectId && <SlideArrows
            currentIndexImage={Object.keys(projects).indexOf(currentProject.id)}
            projectImages={Object.keys(projects)}
            handleArrowClick={handleSwipe}
            classname={'bottom-16 absolute'}
          />}
          <h3 className='text-mood-light'>
            {projects[projectId].name}
          </h3>
          <Link href={`projetos?projeto=${projectId}`}
            className='text-mood-light hover:text-mood-secondary z-20'
          >
            ver mais detalhes
          </Link>
        </div>
      )}
      <div className='flex items-center justify-center gap-5 mb-3'>
        {projects && Object.keys(projects).map(projectId =>
          <div
            className={`
              w-4 h-4 cursor-pointer duration-300 z-10
              rounded-lg hover:bg-mood-secondary focus:invisible
              ${projectId===currentProject.id ?
                'bg-mood-secondary' : 'bg-mood-tertiary'
              }
              border border-mood-quaternary border-solid
            `}
            key={projectId}
            onClick={() => setCurrentProject(projects[projectId])}
          />
        )}
      </div>
    </div>
  );
};

export default Slider;