import React from 'react';
import { InputItem, List } from 'antd-mobile';

export default function input(p) {
  const { options = {}, invalid } = p;
  const style = invalid ? { borderColor: '#f5222d' } : {};
  const { title } = p.schema;
  // const type = format === 'image' ? 'text' : format;
  const handleChange = (value) => p.onChange(value);

  return (
    <List>
      <InputItem
        // placeholder="0.00"
        // extra="¥"
        // clear
        style={style}
        {...options}
        value={p.value}
        disabled={p.disabled}
        readOnly={p.readOnly}
        onChange={handleChange}
      >{title}</InputItem>
    </List>
  );
}
