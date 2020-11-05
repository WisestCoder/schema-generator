import React from 'react';
import { Checkbox } from 'antd';

export default function checkboxes(p) {
  const { enum: enums } = p.schema || {};
  const _value = p.value && Array.isArray(p.value) ? p.value : [];
  return (
    <Checkbox.Group
      {...p.options}
      disabled={p.disabled}
      readOnly={p.readOnly}
      value={_value}
      onChange={p.onChange}
    >
      {(enums || []).map((item, index) => (
        <Checkbox value={item.value} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: item.label,
            }}
          />
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}
