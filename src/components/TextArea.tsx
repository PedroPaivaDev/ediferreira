import React from 'react';

interface PropsTextArea {
  name: string;
  label: string;
  placeholder: string;
}

const TextArea = ({name, label, placeholder}:PropsTextArea) => {
  return (
    <div className='w-full flex flex-col justify-start items-start gap-3'>
      <label htmlFor={name}>{label}</label>
      <textarea 
        id={name}
        name={name}
        placeholder={placeholder}
        className='w-full p-5'
        rows={5}
      />
    </div>
  )
}

export default TextArea;