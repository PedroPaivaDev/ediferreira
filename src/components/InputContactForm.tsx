import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import InputMask from 'react-input-mask';

type PropsInputContactForm = React.ComponentProps<'input'> & {
  id: string;
  name: string;
  className?: string;
}

const InputContactForm = ({id, name, className, ...props}:PropsInputContactForm) => {
  return (
    <div className='relative w-full'>
      { id==='whatsapp' ?
        <Field
            id={id}
            name={name}
            {...props}
            >
          {({ field }: { field: any; }) => (
            <InputMask
              className={`bg-mood-light rounded-sm text-xs p-3 w-full ${className}`}
              mask="(99) 99999-9999"
              maskChar="_"
              id="whatsapp"
              placeholder={name}
              {...field}
            />
          )}
        </Field> :
        <Field
          id={id}
          name={name}
          className={`bg-mood-light rounded-sm text-xs p-3 w-full ${className}`}
          {...props}
        />
      }
      <ErrorMessage name={name} component="p" className="text-red-500 text-xs italic absolute" />
    </div>
  )
}

export default InputContactForm;