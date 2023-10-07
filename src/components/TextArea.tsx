import React from 'react';

interface PropsTextArea {
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  label: string;
  placeholder: string;
}

const TextArea = ({value, setValue, name, label, placeholder}:PropsTextArea) => {
  const [valueDB, setValueDB] = React.useState('');

  function handleOnFocus() {
    if(!value && valueDB==='') {
      setValueDB(placeholder)
    }
  }

  function handleOnBlur() {
    if(!value && placeholder===valueDB) {
      setValueDB('')
    }
  }

  function handleOnChange({target}:React.ChangeEvent<HTMLTextAreaElement>) {
    if(setValue) {
      setValue(target.value);
    } else {
      setValueDB(target.value)
    }
  }

  return (
    <div className='w-full flex flex-col justify-start items-start gap-3'>
      <label htmlFor={name}>{label}</label>
      <textarea 
        id={name}
        name={name}
        placeholder={placeholder}
        className='w-full p-5'
        rows={5}
        value={value ?? valueDB}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
      />
    </div>
  )
}

export default TextArea;