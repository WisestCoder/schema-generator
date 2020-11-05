import React from 'react';
import { Select } from 'antd';

export default  (p) => {
  const { Option } = Select;
  const onChange = value => p.onChange(value);
  const style = p.invalid ? { borderColor: '#f5222d' } : {};
  const { enum: enums } = p.schema || {};

  return (
    <Select
      style={{ width: '100%', ...style }}
      {...p.options}
      disabled={p.disabled}
      readOnly={p.readOnly}
      value={p.value}
      onChange={onChange}
      getPopupContainer={(triggerNode) => {
        return triggerNode;
      }}
    >
      {(enums || []).map((item, index) => {
        let option = item.label;
        const isHtml = typeof option === 'string' && option[0] === '<';
        if (isHtml) {
          option = <span dangerouslySetInnerHTML={{ __html: option }} />;
        }
        return (
          <Option value={item.value} key={index}>
            {option}
          </Option>
        );
      })}
    </Select>
  );
};
