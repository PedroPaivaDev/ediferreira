import React from 'react';

const InputContactForm = ({...props}:React.ComponentProps<'input'>) => {
  return (
    <input
        type='text'
        className='bg-mood-light rounded-sm text-xs p-3'
        {...props}
    />
  )
}

export default InputContactForm;