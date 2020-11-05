import React from 'react';
import { Checkbox, List } from 'antd-mobile';
// import { Group, CheckboxField } from 'saltui';

export default function radio({ value, onChange, disabled, readOnly, schema }) {
  const handleChange = (e) => {
    onChange(e.target.checked);
  };

  return (
    <List>
      <Checkbox.CheckboxItem
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        checked={value}
      >
        {schema.title}
      </Checkbox.CheckboxItem>
    </List>
  );
}
