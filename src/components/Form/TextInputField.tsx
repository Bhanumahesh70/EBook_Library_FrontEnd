import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  customType?: string;
}
function TextInputField({
  label,
  id,
  value,
  onChange,
  customType,
}: InputFieldProps) {
  return (
    <div className=" mb-3 col-sm">
      <label htmlFor={id} className="col-sm-3 col-form-label">
        {label}
      </label>

      <input
        type={customType || 'text'}
        className=" form-control"
        name={id}
        id={id}
        value={value}
        aria-describedby={label}
        onChange={onChange}
        style={{ width: '250px' }}
      />
    </div>
  );
}

export default TextInputField;
