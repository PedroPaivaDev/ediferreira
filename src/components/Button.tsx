import React from 'react'
import Loader from './Loader';

interface PropsButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
  loading?: boolean;
}

const Button = ({label, className, loading, ...props}:PropsButton) => {
  return (
    <>
      <button
        className={`${className}
          bg-mood-secondary rounded-lg px-5 py-3
          text-mood-light hover:text-mood-tertiary duration-300
          shadow-lg
        `}
        {...props}
      >
        {label}
      </button>
      {loading && <Loader text='Salvando...' />}
    </>
  )
}

export default Button