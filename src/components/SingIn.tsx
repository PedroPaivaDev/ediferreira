import React from 'react';

import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';

import Loader from '../components/Loader';
import Button from './Button';

const SignIn = () => {
  const {signInGoogle, logout, userAuth } = React.useContext(AuthGoogleContext);

  if(userAuth===false) {
    return <Loader className='h-screen'/>
  } else if(userAuth===null) {
    return <div className='w-full h-screen mt-5'>
      <h3 className='mb-5'>Página da administração do site</h3>
      <p>Faça login com a sua conta do Google (contato.ediferreira@gmail.com).</p>
      <Button label='Login' onClick={signInGoogle}/>
    </div>
  } else if(userAuth.email!=="contato.ediferreira@gmail.com") {
    return (
      <div className=' h-screen py-3'>
        <p className='text-status-error mb-5'>O e-mail que você selecionou não é o &quot;contato.ediferreira@gmail.com&quot;.</p>
        <p>Clique em &quot;Logout&quot; e escolha o e-mail correto.</p>
        <Button label='Logout' onClick={logout}/>
      </div>
    );
  } else {
    return (
      <div className='w-full max-w-4xl flex p-4'>
        <Button label='Logout' onClick={logout}/>
      </div>
    );
  }
}


export default SignIn;