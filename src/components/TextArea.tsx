import React from 'react';

interface PropsTextArea {
  id: string;
  label: string;
  placeholder: string;
}

const TextArea = ({id, label, placeholder}:PropsTextArea) => {
  return (
    <div className='w-full flex flex-col justify-start items-start gap-3'>
      <label htmlFor={id}>{label}</label>
      <textarea 
        id={id}
        name={id}
        // value={''}
        placeholder={placeholder}
        // onChange={onChange}
        // onBlur={onBlur}
        className='w-full'
      />
    </div>
  )
}

export default TextArea;