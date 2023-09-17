'use client'
import React from 'react'
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

import { auth } from '@/services/firebase';

const provider = new GoogleAuthProvider();

interface PropsAuthGoogleContext {
  userAuth: User|null|false;
  signInGoogle: () => void;
  logout: () => void;
}

const defaultContext: PropsAuthGoogleContext = {
  userAuth: null,
  signInGoogle: () => {},
  logout: () => {}
}

export const AuthGoogleContext = React.createContext<PropsAuthGoogleContext>(defaultContext)

export const AuthGoogleProvider = ({children}:{children:React.ReactNode;}) => {
  const [userAuth, setUserAuth] = React.useState<User|null|false>(false);

  function signInGoogle() {
    signInWithPopup(auth, provider)
    .then((result) => {
      setUserAuth(result.user);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function logout() {
    signOut(auth);
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserAuth(user);
    });
  });

  return (
    <AuthGoogleContext.Provider value={{
      userAuth,
      signInGoogle,
      logout
    }}>
      {children}
    </AuthGoogleContext.Provider>
  )
}

export default AuthGoogleProvider