import React from 'react';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';

import Loader from '../components/Loader';

const SignIn: React.FC = () => {
  const {signInGoogle, logout, userAuth } = React.useContext(AuthGoogleContext);

  if(userAuth===false) {
    return <Loader/>
  } else if(userAuth===null) {
    return <div>      
      <p className='signInMsg'>Olá, Edi. Faça login com a sua conta do Google</p>
      <button onClick={signInGoogle} className='signInButton'>Login com a conta do Google</button>
    </div>
  } else {
    return (
      <div>
        <div className='userData'>
          <div className='userContent'>
            <div className='userName'>
              <button onClick={logout} className='signInButton'>Sair</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default SignIn;