import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

export default (p) => {
  const { enum: enums } = p.schema || {};
  return (
    <RadioGroup
      {...p.options}
      disabled={p.disabled}
      readOnly={p.readOnly}
      value={p.value}
      onChange={(e) => {
        p.onChange(e.target.value);
      }}
    >
      {enums.map((item, index) => (
        <Radio value={item.value} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: item.label || '',
            }}
          />
        </Radio>
      ))}
    </RadioGroup>
  );
};
