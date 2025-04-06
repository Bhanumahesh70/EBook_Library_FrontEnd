import React, { ChangeEvent } from 'react';
interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextAreaField = ({ label, id, value, onChange }: InputFieldProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      <textarea
        className="form-control"
        name={id}
        id={id}
        value={value}
        aria-describedby={label}
        onChange={onChange}
        style={{ width: '250px' }}
      />
    </div>
  );
};

export default TextAreaField;
