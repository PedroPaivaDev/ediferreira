import React from 'react';

interface PropsSelect {
  initial?: string;
  options: string[];
  selectedOption: string | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
  label: string;
  name: string;
  className?: string;
}

const Select = ({initial, options, selectedOption, setSelectedOption, className, label, name, ...props}:PropsSelect) => {

  function handleValue() {
    if(selectedOption && selectedOption.length > 0) {
      return selectedOption;
    } else {
      return '';
    }
  }

  function handleChange({target}:{target:HTMLSelectElement}) {
    setSelectedOption(target.value);
  }

  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <label htmlFor={label}>{label}</label>
      <select
        name={name} id={label}
        value={handleValue()}
        onChange={handleChange}
        className='h-8 px-4' {...props}
      >
        {initial && <option value="" disabled>{initial}</option>}
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default Select;