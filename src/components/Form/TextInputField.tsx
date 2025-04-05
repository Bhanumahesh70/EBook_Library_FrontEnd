import { Label } from '@mui/icons-material';
import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function TextInputField({ label, id, value, onChange }: InputFieldProps) {
  return (
    <div className=" mb-3 col-sm">
      <label htmlFor="title" className="col-sm-3 col-form-label">
        {label}
      </label>

      <input
        type="text"
        className=" form-control"
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
