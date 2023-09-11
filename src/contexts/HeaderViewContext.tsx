'use client'
import React from 'react';

const defaultContext = {
  visible: true,
  currentScrollZero: true
}

export const HeaderViewContext = React.createContext(defaultContext);

const HeaderViewProvider = ({children}:{children:React.ReactNode}) => {
  const [currentScrollZero, setCurrentScrollZero] = React.useState<boolean>(true);
  const [prevScrollPos, setPrevScrollPos] = React.useState<number>(0);
  const [visible, setVisible] = React.useState<boolean>(true);
  
  function handleScroll() {
    const currentScrollPos = window.scrollY;
    if(currentScrollPos===0) {
      setCurrentScrollZero(true);
      setVisible(true);
    } else {
      setCurrentScrollZero(false);
      const isVisible = prevScrollPos > currentScrollPos;
      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <HeaderViewContext.Provider value={{visible, currentScrollZero}}>
      {children}
    </HeaderViewContext.Provider>
  )
}

export default HeaderViewProvider;