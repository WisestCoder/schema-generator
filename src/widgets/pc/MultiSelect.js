import React from 'react';
import { Select } from 'antd';

export default (p) => {
  const { Option } = Select;
  const onChange = value => p.onChange(value);
  const style = p.invalid ? { borderColor: '#f5222d' } : {};
  const { enum: enums } = p.schema || {};
  const _value = p.value && Array.isArray(p.value) ? p.value : [];

  return (
    <Select
      {...p.options}
      style={{ width: '100%', ...style }}
      mode="multiple"
      disabled={p.disabled}
      readOnly={p.readOnly}
      value={_value}
      onChange={onChange}
      getPopupContainer={(triggerNode) => {
        return triggerNode;
      }}
    >
      {(enums || []).map((item, index) => (
        <Option value={item.value} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: item.label,
            }}
          />
        </Option>
      ))}
    </Select>
  );
};
