import React from 'react';

interface PropsP {
  children: string,
  className?: string; 
}

const P = ({children}:PropsP) => {
  return (
    <>
      {children.split('\n').map(paragraph =>
        <p key={paragraph}>{paragraph}</p>
      )}
    </>
  )
}

export default P;