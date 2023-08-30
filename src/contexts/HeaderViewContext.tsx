'use client'
import React from 'react';

const defaultContext = {
  visible: true,
  handleScroll: (event:React.UIEvent<HTMLDivElement>) => {}
}

export const HeaderViewContext = React.createContext(defaultContext);

const HeaderViewProvider = ({children}:{children:React.ReactNode}) => {
  const [prevScrollPos, setPrevScrollPos] = React.useState<number>(0);
  const [visible, setVisible] = React.useState<boolean>(true);
  
  function handleScroll(event:React.UIEvent<HTMLDivElement>) {
    const currentScrollPos = event.currentTarget.scrollTop;
    if(currentScrollPos===0) {
      setVisible(true);
    } else {
      const isVisible = prevScrollPos > currentScrollPos;
      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    }
  };

  return (
    <HeaderViewContext.Provider value={{visible, handleScroll}}>
      {children}
    </HeaderViewContext.Provider>
  )
}

export default HeaderViewProvider;