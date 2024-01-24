import React from 'react';

type Props = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({value, onChange, ...props}) => {
  return (
    <input
      className="input is-normal"
      type="text"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};
