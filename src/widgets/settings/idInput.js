import React from 'react';
import { Input } from 'antd';
import { getKeyFromUniqueId, changeKeyFromUniqueId } from '../../utils/schema';

export default function IdInput({
  onChange,
  value,
  disabled,
  readOnly,
  options,
}) {
  const handleChange = e => {
    try {
      const newId = changeKeyFromUniqueId(value, e.target.value);
      onChange(newId);
    } catch (error) {}
  };

  return (
    <Input
      disabled={disabled}
      readOnly={readOnly}
      {...options}
      onChange={handleChange}
      value={getKeyFromUniqueId(value)}
    />
  );
}
