import React from 'react';

interface PropsInputText {
  label: string;
  name: string;
  placeholder: string;
  className?: string;
}

const InputText = ({label, name, placeholder, className}: PropsInputText) => {
  const [valueDB, setValueDB] = React.useState('');

  function handleOnFocus() {
    if(valueDB==='') {
      setValueDB(placeholder)
    }
  }

  function handleOnBlur() {
    if(placeholder===valueDB) {
      setValueDB('')
    }
  }

  return (
    <div className={`${className} w-full flex flex-col justify-start items-start gap-3`}>
      <label htmlFor={name} className='mr-3'>{label}</label>
      <input 
        id={name}
        name={name}
        type='text'
        placeholder={placeholder}
        className='p-3 w-full'
        value={valueDB}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={({target}) => setValueDB(target.value)}
      />
    </div>
  )
}

export default InputText;