import React from 'react';

interface PropsInputText {
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  name: string;
  placeholder: string;
  className?: string;
}

const InputText = ({value, setValue, label, name, placeholder, className}: PropsInputText) => {
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

  function handleOnChange({target}:React.ChangeEvent<HTMLInputElement>) {
    if(setValue) {
      setValue(target.value);
    } else {
      setValueDB(target.value)
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
        value={value ?? valueDB}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
      />
    </div>
  )
}

export default InputText;