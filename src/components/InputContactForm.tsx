import React from 'react';

type PropsInputContactForm = React.ComponentProps<'input'> & {
  className?: string;
}

const InputContactForm = ({className, ...props}:PropsInputContactForm) => {
  return (
    <input
        type='text'
        className={`bg-mood-light rounded-sm text-xs p-3 ${className}`}
        {...props}
    />
  )
}

export default InputContactForm;