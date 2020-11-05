import React from 'react';
import { Input } from 'antd';

export default function SGInput(p) {
  const { options = {}, invalid } = p;
  const style = invalid ? { borderColor: '#f5222d' } : {};
  const { format = 'text' } = p.schema;
  const handleChange = (e) => p.onChange(e.target.value);

  return (
    <Input
      style={style}
      {...options}
      value={p.value}
      type={format}
      disabled={p.disabled}
      readOnly={p.readOnly}
      onChange={handleChange}
    />
  );
}
