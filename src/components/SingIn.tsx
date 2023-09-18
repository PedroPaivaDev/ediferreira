import React from 'react';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';

import Loader from '../components/Loader';

const SignIn = ({isEdiEmail}:{isEdiEmail:boolean}) => {
  const {signInGoogle, logout, userAuth } = React.useContext(AuthGoogleContext);

  if(userAuth===false) {
    return <Loader className='h-screen'/>
  } else if(userAuth===null) {
    return <div className='w-full h-screen mt-5'>
      <h3 className='mb-5'>Página da administração do site</h3>
      <p>Faça login com a sua conta do Google (contato.ediferreira@gmail.com).</p>
      <button onClick={signInGoogle} className='
        bg-mood-secondary rounded-lg px-5 py-3 mt-5
        text-mood-light hover:text-mood-tertiary duration-300
      '>
        Login
      </button>
    </div>
  } else {
    return (
      <div className='py-3'>
        {isEdiEmail && <p className='text-status-error mb-5'>O e-mail que você selecionou não é o "contato.ediferreira@gmail.com". Clique em "Logout" e escolha o e-mail correto.</p>}
        <button onClick={logout} className='
          bg-mood-secondary rounded-lg px-5 py-3
          text-mood-light hover:text-mood-tertiary duration-300
        '>
          Logout
        </button>
      </div>
    );
  }
}


export default SignIn;