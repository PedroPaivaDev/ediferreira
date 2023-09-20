import React from 'react'

interface PropsButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
}

const Button = ({label, className, ...props}:PropsButton) => {
  return (
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
  )
}

export default Button