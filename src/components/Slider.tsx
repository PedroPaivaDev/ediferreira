import React from 'react';
import Link from 'next/link';

import objectBgImage from '@/helpers/objectBgImage';

interface PropsSlider {
  projects: ProjectsDB;
}

const Slider: React.FC<PropsSlider> = ({ projects }) => {
  const startXRef = React.useRef<number | null>(null);
  const startYRef = React.useRef<number | null>(null);
  
  const [currentProject, setCurrentProject] = React.useState<ProjectDB>(projects[Object.keys(projects)[0]]);
  const [animeDirection, setAnimeDirection] = React.useState('animeRight');

  function handleSwipe(direction: 'right' | 'left') {
    if(Object.keys(projects).length > 1) {
      const arrayProjects = Object.keys(projects);
      const indexCurrentProj = arrayProjects.indexOf(currentProject.id);
      if(
        direction==='right' &&
        indexCurrentProj > 0
      ) {
        setAnimeDirection('animeLeft');
        setCurrentProject(projects[arrayProjects[indexCurrentProj - 1]]);
      } else if(
        direction==='left' &&
        indexCurrentProj < (arrayProjects.length - 1)
      ) {
        setAnimeDirection('animeRight');
        setCurrentProject(projects[arrayProjects[indexCurrentProj + 1]])
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
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    }

    startXRef.current = null;
    startYRef.current = null;
  };

  return (
    <div id='slider'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className='w-full h-almostScreen relative flex items-end justify-center'
    >
      {projects && Object.keys(projects).map(projectId =>
        <div key={projects[projectId].id}
          style={objectBgImage(projects[projectId].mainPhoto)}
          className={`
            absolute w-full h-full
            flex flex-col justify-end items-center pb-12
            ${projectId===currentProject.id ?
              `visible ${animeDirection}` : 'invisible'
            }
          `}
        >
          <h3 className='text-mood-light'>
            {projects[projectId].name}
          </h3>
          <Link href={`projetos?projeto=${projectId}`}
            className='text-mood-light hover:text-mood-secondary'
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