'use client'
import React from 'react';

const defaultContext = {
  visible: true,
  handleScroll: (event:React.UIEvent<HTMLElement>) => {},
  currentScrollZero: true
}

export const HeaderViewContext = React.createContext(defaultContext);

const HeaderViewProvider = ({children}:{children:React.ReactNode}) => {
  const [currentScrollZero, setCurrentScrollZero] = React.useState<boolean>(true);
  const [prevScrollPos, setPrevScrollPos] = React.useState<number>(0);
  const [visible, setVisible] = React.useState<boolean>(true);
  
  function handleScroll(event:React.UIEvent<HTMLElement>) {
    const currentScrollPos = event.currentTarget.scrollTop;
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

  return (
    <HeaderViewContext.Provider value={{visible, handleScroll, currentScrollZero}}>
      {children}
    </HeaderViewContext.Provider>
  )
}

export default HeaderViewProvider;