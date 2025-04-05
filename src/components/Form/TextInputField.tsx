import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  name?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  customType?: string;
  className?: string;
  isChecked?: boolean;
}
function TextInputField({
  label,
  id,
  name,
  value,
  onChange,
  customType,
  className,
  isChecked,
}: InputFieldProps) {
  const isRadioOrCheckbox = customType === 'radio' || customType === 'checkbox';
  return (
    <div className={isRadioOrCheckbox ? 'form-check' : 'mb-3 col-sm'}>
      <label
        htmlFor={id}
        className={
          isRadioOrCheckbox ? 'form-check-label' : 'col-sm-3 col-form-label'
        }
      >
        {label}
      </label>

      <input
        type={customType || 'text'}
        className={`${
          isRadioOrCheckbox ? 'form-check-input' : 'form-control '
        } ${className}`}
        name={name || id}
        id={id}
        value={value}
        aria-describedby={label}
        onChange={onChange}
        style={isRadioOrCheckbox ? undefined : { width: '250px' }}
        checked={isRadioOrCheckbox ? isChecked : undefined}
      />
    </div>
  );
}

export default TextInputField;
