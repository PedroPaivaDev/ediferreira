import React from 'react';
import Image from 'next/image';

interface PropsLoader {
  className?: string;
}

const Loader = ({className}:PropsLoader) => {
  return (
    <div className={className}>
      <Image
        src={'./loader.svg'}
        alt='carregando'
        width={200}
        height={200}
      />
      <p>Carregando...</p>
    </div>
  )
}

export default Loader;