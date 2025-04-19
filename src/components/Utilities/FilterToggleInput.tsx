// components/FilterToggleInput.tsx
import React from 'react';
import { Form } from 'react-bootstrap';

type Props = {
  name: string;
  type: 'text' | 'date' | 'select';
  value: string;
  options?: string[];
  show: boolean;
  onToggle: () => void;
  onChange: (e: React.ChangeEvent<any>) => void;
  placeHolder?: string;
};

const FilterToggleInput: React.FC<Props> = ({
  name,
  type,
  value,
  options = [],
  show,
  onToggle,
  onChange,
  placeHolder,
}) => {
  return (
    <>
      <span
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        🔍
      </span>
      {show &&
        (type === 'select' ? (
          <Form.Select
            size="sm"
            name={name}
            value={value}
            onChange={onChange}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="">All</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Form.Select>
        ) : (
          <Form.Control
            type={type}
            size="sm"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
            onClick={(e) => e.stopPropagation()}
          />
        ))}
    </>
  );
};

export default FilterToggleInput;
